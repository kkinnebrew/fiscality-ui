Component = require('../../component.coffee')
template = require('./editor.hbs')

class EditorComponent extends Component

  getTemplate: -> return template()

module.exports = EditorComponent