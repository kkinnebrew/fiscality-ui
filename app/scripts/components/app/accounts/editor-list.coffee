ListComponent = require('../../list-component1.coffee')
template = require('./editor-list.hbs')

class EditorListComponent extends ListComponent

  getTemplate: -> template()

module.exports = EditorListComponent

