ListComponent = require('../../list-component1.coffee')
template = require('./editor-list.hbs')

class EditorListComponent extends ListComponent

  getTemplate: -> template()

  render: ->

    super

    @$el.on 'click', '.add-transaction-btn', =>
      @append({})

module.exports = EditorListComponent

