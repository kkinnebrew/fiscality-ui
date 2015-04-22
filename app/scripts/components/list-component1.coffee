_ = require('underscore')
$ = require('jquery')
Log = require('../common/log.coffee')
componentFactory = require('./component-factory.coffee')

class ListComponent

  constructor: ($el, model, scope) ->

    # validate inputs

    return Log.error('Invalid element passed to component') if !$el or !$el.length

    # store references

    @$el = $el
    @$outlet = null
    @model = model || []
    @scope = scope || {}
    @children = []

    # events properties

    @events = {}

    # read props off $el

    @repeater = $el.attr('data-repeat') || null

    return Log.error('Repeater not set for component') if !@repeater

  getTemplate: ->
    throw new Error('Cannot get template for abstract list component')

  render: () ->

    # generate template

    $template = $(@getTemplate())

    # pass along class attributes

    classList = if @$el.attr('class') then @$el.attr('class').split(/\s+/) else []

    _.each classList, (item) =>
      @$el.addClass(item)

    # find outlet

    if $template.find('[data-outlet]').length == 1
      @$outlet = $template.find('[data-outlet]')
    else
      @$outlet = $template

    # iterate through model

    _.each @model, (item) =>

      component = @_generate(item)

      @$outlet.append(component.$el)

    # update parent reference with rendered template

    @$el = $template.replaceAll(@$el)

  destroy: () ->

    @$el.remove()
    @$outlet = null

  append: (model) ->

    @model.push(model)

    component = @_generate(model)

    @$outlet.append(component.$el)

    @fire('change')

  prepend: (model) ->

    @model.unshift(model)

    component = @_generate(model)

    @$outlet.prepend(component.$el)

    @fire('change')

  getValue: () ->

    return @model

  setValue: (value) ->

    console.log('set value', value)

    @children = []

    @$outlet.empty()

    @model = value

    _.each @model, (item) =>

      component = @_generate(item)

      @$outlet.append(component.$el)

  _generate: (model) ->

    # create component

    component = componentFactory.getInstance(@repeater, $('<div></div>'), model, @scope)

    # bind events

    component.on 'change', @_onChange
    component.on 'destroy', @_onDestroy

    # render

    component.render()

    # store reference

    @children.push({
      model: model,
      component: component
    })

    return component

  _remove: (component) ->

    # fetch cache node based on component

    index = null

    _.each @children, (child, i) ->
      index = i if child.component == component

    node = @children[index]

    @children.splice(index, 1)

    # fetch and remove item in model array

    modelIndex = null

    _.each @model, (item, i) ->
      modelIndex = i if item == node.model

    @model.splice(modelIndex, 1)

    # destroy and thus remove from DOM component

    component.destroy()

    @fire('change')

  _onChange: (e) =>

    component = e.currentTarget

    # fetch cache node based on component

    index = null

    _.each @children, (child, i) ->
      index = i if child.component == component

    node = @children[index]

    # fetch and remove item in model array

    modelIndex = null

    _.each @model, (item, i) ->
      modelIndex = i if item == node.model

    # update the model value

    value = component.getValue()

    @model[modelIndex] = value
    node.model = value

    # fire change up to parent

    @fire('change')

  _onDestroy: (e) =>

    component = e.currentTarget

    @_remove(component)

  # event handlers

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

module.exports = ListComponent