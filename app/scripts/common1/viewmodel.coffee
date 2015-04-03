_ = require('underscore')
Log = require('./log.coffee')

class ViewModel

  constructor: ->

    @loading = false

    @events = {}

  update: ->

  setParams: (params) ->

    changed = false

    _.each params, (value, name) =>
      if this.hasOwnProperty(name) and this[name] != value
        this[name] = value
        changed = true

    @update() if changed

  startLoading: ->

    @loading = true

  stopLoading: ->

    @loading = false

  goto: (path) ->
    @router.goto(path)

  run: (method, args) ->

    if typeof this[method] != 'function'
      return Log.error('Unknown method on viewmodel: ' + method)

    values = [];

    for i in [0...args.length] by 1
      if !this.hasOwnProperty(args[i])
        Log.warn('Unknown property on viewmodel: ' + args[i])
      else
        values.push(this[args[i]])

    this[method].apply(this, values)

  on: (event, callback) ->

    if !@events.hasOwnProperty(event)
      @events[event] = []

    @events[event].push(callback)

  detach: (event, callback) ->

    if @events.hasOwnProperty(event)
      index = @events[event].indexOf(callback)
      if index != -1
        @events[event].splice(index, 1)

  fire: (event) ->

    args = Array.prototype.slice.call(arguments)

    if @events.hasOwnProperty(event)
      for i in [0...@events[event].length]
        @events[event][i].apply(this, args)

module.exports = ViewModel