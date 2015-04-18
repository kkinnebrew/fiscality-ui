Component = require('../../component.coffee')
template = require('./editor-line.hbs')

class EditorLineComponent extends Component

  getTemplate: -> return template()

  render: ->

    super

    @$el.on 'click', '.delete-line-button', =>
      @fire('destroy')

module.exports = EditorLineComponent