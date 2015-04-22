ValueComponent = require('./value-component.coffee')
$ = require('jquery')
_ = require('underscore')

class DateFieldComponent extends ValueComponent

  constructor: ($el, model, scope) ->

    super

    @format = $el.attr('data-format') || null

  getTemplate: ->
    return $('<input class="date-field field" type="text" placeholder="Date" />')

  render: ->

    # be sure to read props before doing this

    classList = if @$el.attr('class') then @$el.attr('class').split(/\s+/) else []

    @$el = $(@getTemplate()).replaceAll(@$el)

    _.each classList, (item) =>
      @$el.addClass(item)

    # set value

    @model = new Date() if !@model

    if @format
      @$el.val(Date.parse(@model).toString(@format))
    else
      @$el.val(@model) if @model

    # bind events

    @$el.on 'change', =>
      @model = @$el.val()
      @fire('change')

module.exports = DateFieldComponent