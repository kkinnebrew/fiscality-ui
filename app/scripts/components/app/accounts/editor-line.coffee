Component = require('../../component.coffee')
template = require('./editor-line.hbs')

class EditorLineComponent extends Component

  getTemplate: -> return template()

module.exports = EditorLineComponent