Log = require('./log.coffee')

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

    Log.info('Registering state "' + name + '"')

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

    Log.info('Listening for hash changes')

  renderState: (state) ->

  destroyState: (state) ->

  renderGlobal: (name, viewmodel) ->

  destroyGlobal: (name) ->

module.exports = Router
