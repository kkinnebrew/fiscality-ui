Component = require('../../component.coffee')
template = require('./editor.hbs')

class EditorComponent extends Component

  getTemplate: -> return template()

  render: ->

    super

    @$el.find('.line-editor').hide()

    @$el.on 'click', '[data-model="accountNames"]', =>
      @$el.find('.line-editor').toggle()


module.exports = EditorComponent