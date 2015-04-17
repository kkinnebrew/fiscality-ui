ValueComponent = require('./value-component.coffee')
$ = require('jquery')

class DateFieldComponent extends ValueComponent

  constructor: ($el, model, scope) ->

    super

    @format = $el.attr('data-format') || null

  getTemplate: ->
    return $('<input class="date-field" type="text" placeholder="Date" />')

  render: ->

    # be sure to read props before doing this

    @$el = $(@getTemplate()).replaceAll(@$el)

    # set value

    if @format
      @$el.val(Date.parse(@model).toString(@format))
    else
      @$el.val(@model) if @model

    # bind events

    @$el.on 'change', =>
      @model = @$el.val()
      @fire('change')

module.exports = DateFieldComponent