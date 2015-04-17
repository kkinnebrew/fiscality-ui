ValueComponent = require('./value-component.coffee')
$ = require('jquery')
_ = require('underscore')

class SelectFieldComponent extends ValueComponent

  constructor: ->

    super

    @source = @$el.attr('data-source')

  getTemplate: =>

    list = $('<select></select>')

    if @source and @scope.hasOwnProperty(@source)
      items = @scope[@source]
      _.each items, (item) =>
        if typeof item == 'string'
          list.append('<option value="' + item + '">' + item + '</option>')
        else
          list.append('<option value="' + item.value + '">' + item.label + '</option>')

    return list

module.exports = SelectFieldComponent