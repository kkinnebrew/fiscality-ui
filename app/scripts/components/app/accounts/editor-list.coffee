ListComponent = require('../../list-component.coffee')
template = require('./editor-list.hbs')

class EditorListComponent extends ListComponent

  getTemplate: -> template()

module.exports = EditorListComponent

