ListComponent = require('../../list-component.coffee')
template = require('./line-editor.hbs')

class LineEditorComponent extends ListComponent

  getTemplate: -> template()

  render: ->

    super

    @$el.on 'click', '.add-line-button', =>
      @push({
        transactionId: null
        accountId: null
        amount: 0
      })


module.exports = LineEditorComponent

