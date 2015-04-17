ValueComponent = require('./value-component.coffee')
$ = require('jquery')

class TextFieldComponent extends ValueComponent

  getTemplate: ->
    return $('<input type="text" placeholder="ex. Text" />')

module.exports = TextFieldComponent