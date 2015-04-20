Log = require('../common/log.coffee')
$ = require('jquery')
_ = require('underscore')

class ValueComponent

  constructor: ($el, model, scope) ->

    # validate inputs

    return Log.error('Invalid element passed to component') if !$el or !$el.length

    # store references

    @$el = $el
    @model = model || []
    @scope = scope || {}

    # events properties

    @events = {}

  render: ->

    # generate template

    $template = $(@getTemplate())

    # pass along class attributes

    classList = if @$el.attr('class') then @$el.attr('class').split(/\s+/) else []

    _.each classList, (item) =>
      @$el.addClass(item)

    # set value

    @setValue(@model)

    # bind events

    @$el.on 'change', =>
      @model = @$el.val()
      @fire('change')

    # replace element

    @$el = $template.replaceAll(@$el)

  destroy: ->

    @$el.remove()

  getValue: ->

    return @model

  setValue: (value) ->

    @model = value

    if @model
      @$el.val(value)
    else
      @$el.val('')

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


module.exports = ValueComponent