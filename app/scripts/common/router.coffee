$ = require('jquery')
_ = require('underscore')
Log = require('./log.coffee')
View = require('./view.coffee')
ViewModel = require('./viewmodel.coffee')
ReactView = require('./react-view.coffee')

class Router

  constructor: (@$root) ->

    @stack = []

    @config = {}

    @defaultState = null

    @globals = {}

    @state = null

    @params = {}

  otherwise: (state) ->

    @defaultState = state.replace(/(^\/?)|(\/$)/g, '')

  register: (name, conf) ->

    parts = name.split('.')

    while parts.length

      part = parts.shift()

      config = {}

      if conf.template

        config.views =
          'default':
            primary: true
            template: conf.template

        config.views['default'].view = conf.view if conf.hasOwnProperty('view')
        config.views['default'].viewmodel = conf.viewmodel if conf.hasOwnProperty('viewmodel')

        config.redirect = conf.redirect if conf.hasOwnProperty('redirect')
        config.params = conf.params if conf.hasOwnProperty('params')

      else

        config = conf

      last = @config if !last

      if !parts.length

        Log.warn('Overriding existing route "' + name + '"') if last.hasOwnProperty(part)

        last[part] =
          config: config,
          children: {}

      else

        Log.warn('Parent route not defined "' + name + '"') if !last.hasOwnProperty(part)

        last = last[part].children

    Log.debug('Registering state "' + name + '"')

  getConfig: (name) ->

    parts = name.split('.')

    while parts.length

      part = parts.shift()

      last = @config if !last

      if !last.hasOwnProperty(part)
        return Log.error('State "' + name + '" not defined')

      if !parts.length
        return last[part].config
      else
        last = last[part].children

  replaceState: (state) ->
  
  goto: (path, params) ->

    hash = '#'

    parts = path.split('.')

    while parts.length

      part = parts.shift()

      state = if state then state + '.' + part else part

      config = @getConfig(state)

      hash = hash + '/' + part

      if !config
        return Log.error('State not found for invalid route "' + state + '"')

      if config.params
        for i in [0...config.params.length] by 1
          if params and params.hasOwnProperty(config.params[i])
            hash = hash + '/' + params[config.params[i]]
          else if parts.length
            hash = hash + '/undefined'

    location.hash = hash

  listen: ->

    $(window).on('hashchange', @render);

    @render()

    Log.info('Listening for hash changes')

  render: =>

    parts = location.hash.replace(/(^#\/?)|(\/$)/g, '').split('/')

    if parts.length == 1 and parts[0] == ''

      if @defaultState

        Log.info('Redirecting to default state')

        return location.hash = '#/' + @defaultState

      else

        return Log.error('No default state defined')

    depth = 0
    params = {}

    _.each @globals, (node, name) =>
      @destroyGlobal(name) if node.$el and !node.destroying

    while parts.length

      part = parts.shift()

      state = if state then state + '.' + part else part

      config = @getConfig(state)

      if !config
        return Log.error('State not found for invalid route "' + state + '"')

      if config.params
        params[param] = parts.shift() for param in config.params if config.params

      if !@stack[depth] or @stack[depth].state != state

        # render the state

        @renderState(state, config, depth, params)

      else if @stack[depth] and @stack[depth].state == state

        _.each @stack[depth].views, (node) ->
          node.viewmodel.setParams(params) if node.viewmodel

        if @stack[depth].controller
          @stack[depth].controller.setParams(params, true)
          @stack[depth].controller.update()

      depth++

    @params = params

    # update params via event queue

    if config.redirect

      redirect = config.redirect.replace(/(^#?\/?)|(\/$)/g, '')

      Log.info('Redirecting to path "' + redirect + '"')

      return location.hash = '#/' + redirect

    if @stack.length > depth

      for i in [depth...@stack.length] by 1
        @destroyState(i)

      @stack.splice(depth)

  renderState: (state, config, depth, params) ->

    @destroyState(depth) if @stack[depth]

    node = {
      state: state
      views: {}
    }

    _.each config.views, (conf, name) =>

      if !name.match(/@/)

        subnode = {}
        subnode.primary = true if conf.primary == true
        subnode.name = conf.name if conf.name

        if typeof conf.viewmodel == 'function'
          subnode.viewmodel = new conf.viewmodel(params)
          subnode.viewmodel.router = this
        else
          subnode.viewmodel = new ViewModel(params)
          subnode.viewmodel.router = this

        if conf.react
          subnode.view = new ReactView(conf.view, subnode.viewmodel or undefined)
        else if typeof conf.view == 'function'
          subnode.view = new conf.view(conf.template, subnode.viewmodel or undefined)
        else
          subnode.view = new View(conf.template, subnode.viewmodel or undefined)

        if (depth == 0)
          $el = @$root.find(if name and name != 'default' then '[ui-view="' + name + '"]' else '[ui-view]')
          subnode.view.render($el)
        else
          prior = @stack[depth-1]
          primary = _.find prior.views, (view) ->
            return view.hasOwnProperty('primary') and view.primary == true
          if primary
            primary.view.renderSubview(name, subnode.view)
          else
            Log.warn('No main view found for partial state: ' + state + ' -> ' + name)

        node.views[name] = subnode

        Log.debug('Rendering relative state: ' + state + ' -> ' + name);

    @stack[depth] = node

    _.each config.views, (conf, name) =>

      if name.match(/@/)

        subnode = {}

        subnode.name = conf.name if conf.name

        if typeof conf.viewmodel == 'function'
          subnode.viewmodel = new conf.viewmodel(params)
          subnode.viewmodel.router = this
        else
          subnode.viewmodel = new ViewModel(params)
          subnode.viewmodel.router = this

        if conf.react
          subnode.view = new ReactView(conf.view, subnode.viewmodel or undefined)
        else if typeof conf.view == 'function'
          subnode.view = new conf.view(conf.template, subnode.viewmodel or undefined)
        else
          subnode.view = new View(conf.template, subnode.viewmodel or undefined)

        parts = name.split('@')
        target = parts[0]
        context = parts[1]

        current = @stack[depth]

        if context != 'global'

          if !current.views.hasOwnProperty(context)
            return Log.error('Absolute view context "' + context + '" not defined')

          current.views[context].view.renderSubview(target, subnode.view)

          Log.debug('Rendering absolute state: ' + state + ' -> ' + name);

        else if config.controller

          @globals[target] = subnode

        node.views[target] = subnode

    if config.controller

      node.controller = new config.controller(params)
      node.controller.router = this

      _.each node.views, (subnode) ->
        node.controller[subnode.name + 'ViewModel'] = subnode.viewmodel if subnode.name

      node.controller.load()

  destroyState: (depth) ->

    node = @stack[depth]

    item.destroy() for item in node.views

    node.controller.destroy() if node.controller

    Log.debug('Destroying state: ' + @stack[depth].state)

  renderGlobal: (name) ->

    return if !@globals.hasOwnProperty(name)

    Log.debug('Rendering global state "' + name + '"')

    count = @$root.find('[data-global]').length

    $global = $('<div data-global="' + name + '"></div>')

    $global.css('z-index', 100 + count)

    @$root.append($global)

    node = @globals[name]

    node.view.render($global)

    node.$el = $global

  destroyGlobal: (name) ->

    return if !@globals.hasOwnProperty(name)

    Log.debug('Destroying global state "' + name + '"')

    node = @globals[name]

    node.destroying = true

    node.view.destroy ->

      node.$el.remove()

      delete node.$el

module.exports = Router
