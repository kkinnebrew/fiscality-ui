componentFactory = require('./component-factory.coffee')
$ = require('jquery')
_ = require('underscore')

class Component

  constructor: ($el, model, scope) ->

    @$el = $el
    @scope = scope
    @model = model
    @events = {}

    @children = []

  getTemplate: ->
    throw new Error('Cannot get template for abstract component')

  render: ->

    self = this

    # be sure to read props before doing this

    @$el = $(@getTemplate()).replaceAll(@$el)

    # find all model references

    data = {}

    # build exact set

    @$el.find('[data-model]').each ->
      name = $(this).attr('data-model')
      if self.model.hasOwnProperty(name) and !data.hasOwnProperty(name)
        data[name] = self.model[name]

    @model = data

    # render children

    @$el.find('[data-component]').each ->

      $el = $(this)

      name = $el.attr('data-component')
      model = $el.attr('data-model')

      component = componentFactory.getInstance(name, $el, self.model[model], self.scope)

      self.children.push({
        $el: component.$el
        model: model
        component: component
      })

      component.render()

      component.on 'change', ->

        value = component.getValue()

        # set new value from child

        self.model[model] = value

        # update anything referencing this model, excluding the model that sent it

        _.each self.children, (child) ->
          if child.model == model and child.component != component
            child.component.setValue(value)

        self.onChange()

        self.fire('change')

      self.model[model] = component.getValue()

    # render static elements

    @$el.find('[data-model]:not([data-component])').each ->

      $el = $(this)

      model = $el.attr('data-model')
      defaultVal = $el.attr('data-default')
      tagName = $el.prop('tagName')

      if tagName == 'DIV' and self.model[model]
        $el.text(self.model[model])
      else if tagName == 'DIV'
        $el.text(defaultVal || '')

  onChange: ->

  destroy: ->

    @$el.remove()
    @children = []

  getValue: ->

    return @model

  _setProperty: (name, value) ->

    @model[name] = value

    _.each @children, (child) ->
      if child.model == name
        child.component.setValue(value)

  setValue: (values) ->

    _.each values, (value, name) =>
      @_setProperty(name, value)

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