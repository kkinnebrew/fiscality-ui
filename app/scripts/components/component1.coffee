componentFactory = require('./component-factory.coffee')
Log = require('../common/log.coffee')
$ = require('jquery')
_ = require('underscore')

class Component

  constructor: ($el, model, scope) ->

    # validate inputs

    return Log.error('Invalid element passed to component') if !$el or !$el.length

    # store references

    @$el = $el
    @model = model || []
    @scope = scope || {}
    @children = []

    # events properties

    @events = {}

  render: ->

  destroy: ->

  getValue: ->

  setValue: (value) ->

  on: (event, callback) ->

    @events[event] = [] if !@events.hasOwnProperty(event)

    @events[event].push(callback)

  detach: (event) ->

    return @events = {} if !event

    if event && @events.hasOwnProperty(event)
      delete @events[event]

  fire: (event) ->

    if @events.hasOwnProperty(event)
      _.each @events[event], (callback) =>
        e = currentTarget: this
        callback.call(this, e)


module.exports = Component