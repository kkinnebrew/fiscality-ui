$ = require('jquery')
_ = require('underscore')
Log = require('./log.coffee')
View = require('./view.coffee')
ViewModel = require('./viewmodel.coffee')

class Router

  constructor: (@$root) ->

    @stack = []

    @config = {}

    @defaultState = null

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
  
  goto: (state) ->

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

    while parts.length

      part = parts.shift()

      state = if state then state + '.' + part else part

      config = @getConfig(state)

      if !config
        return Log.error('State not found for invalid route "' + state + '"')

      if config.params
        params[param] = parts.shift() for param in config.params if config.params

      if !@stack[depth] || @stack[depth].state != state

        # render the state

        @renderState(state, config, depth, params)

      depth++

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
        subnode.viewmodel = new conf.viewmodel(params) if conf.viewmodel instanceof ViewModel
        subnode.view = if conf.view instanceof View then new conf.view(conf.template) else new View(conf.template)

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

        subnode.viewmodel = new conf.viewmodel(params) if conf.viewmodel instanceof ViewModel
        subnode.view = if conf.view instanceof View then new conf.view(conf.template) else new View(conf.template)

        parts = name.split('@')
        target = parts[0]
        context = parts[1]

        current = @stack[depth]

        if context != 'global'

          if !current.views.hasOwnProperty(context)
            return Log.error('Absolute view context "' + context + '" not defined')

          current.views[context].view.renderSubview(target, subnode.view)

        node.views[target] = subnode

        Log.debug('Rendering absolute state: ' + state + ' -> ' + name);

    if config.presenter
      node.presenter = new config.presenter(params)

  destroyState: (depth) ->

    node = @stack[depth]

    item.destroy() for item in node.views

    Log.debug('Destroying state: ' + @stack[depth].state)

  renderGlobal: (name, viewmodel) ->

  destroyGlobal: (name) ->

module.exports = Router
