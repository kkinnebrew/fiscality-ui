componentFactory = require('./component-factory.coffee')
$ = require('jquery')
_ = require('underscore')

class ValueComponent

  constructor: ($el, model, scope) ->

    @$el = $el
    @scope = scope
    @model = model
    @events = {}

    @children = []

  getTemplate: ->
    throw new Error('Cannot get template for abstract component')

  render: ->

    # be sure to read props before doing this

    classList = if @$el.attr('class') then @$el.attr('class').split(/\s+/) else []

    @$el = $(@getTemplate()).replaceAll(@$el)

    _.each classList, (item) =>
      @$el.addClass(item)

    # set value

    @$el.val(@model) if @model

    # bind events

    @$el.on 'change', =>
      @model = @$el.val()
      @fire('change')

  destroy: ->

    @$el.remove()

  getValue: ->

    return @model

  setValue: (name, value) ->

    @model[name] = value

    _.each @children, (child) ->
      if child.model == name
        child.component.setValue(value)

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