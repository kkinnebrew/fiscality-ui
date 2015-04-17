componentFactory = require('./component-factory.coffee')
$ = require('jquery')
_ = require('underscore')

class ListComponent

  constructor: ($el, model, scope) ->

    @$el = $el
    @scope = scope
    @model = model || []
    @events = {}

    @children = []

  getTemplate: ->
    throw new Error('Cannot get template for abstract list component')

  render: ->

    self = this

    $template = $(@getTemplate())

    $appendTo = if $template.find('[data-outlet]').length then $template.find('[data-outlet]') else $template

    name = @$el.attr('data-repeat')

    # be sure to read props before doing this

    _.each @model, (line, index) ->

      component = componentFactory.getInstance(name, $('<div></div>'), line, self.scope)

      self.children.push({
        $el: component.$el
        component: component,
        index: index
      })

      component.render()

      component.on 'change', ->

        value = component.getValue()

        # set new value from child

        self.model[index] = value

        # update anything referencing this model, excluding the model that sent it

        _.each self.children, (child) ->
          if child.index == index and child.component != component
            child.component.setValue(value)

        # fire change up

        self.fire('change')

      $appendTo.append(component.$el)

    # be sure whatever instantiates this updates their reference to the new $el

    @$el = $template.replaceAll(@$el)

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
      _.each @events[event], (callback) ->
        callback.call(this)

module.exports = ListComponent

