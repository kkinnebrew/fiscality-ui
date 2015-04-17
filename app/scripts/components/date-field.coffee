ValueComponent = require('./value-component.coffee')
$ = require('jquery')

class DateFieldComponent extends ValueComponent

  getTemplate: ->
    return $('<input type="text" placeholder="Date" />')

module.exports = DateFieldComponent