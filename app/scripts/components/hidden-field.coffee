ValueComponent = require('./value-component.coffee')
$ = require('jquery')

class HiddenFieldComponent extends ValueComponent

  getTemplate: ->
    return $('<input type="hidden" />')

module.exports = HiddenFieldComponent