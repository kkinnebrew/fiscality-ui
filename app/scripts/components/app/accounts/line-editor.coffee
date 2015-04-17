ListComponent = require('../../list-component.coffee')
template = require('./line-editor.hbs')

class LineEditorComponent extends ListComponent

  getTemplate: -> template()

module.exports = LineEditorComponent

