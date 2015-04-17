ValueComponent = require('./value-component.coffee')
$ = require('jquery')

class TextFieldComponent extends ValueComponent

  getTemplate: ->
    return $('<input class="text-field" type="text" placeholder="ex. Text" />')

module.exports = TextFieldComponent