ListComponent = require('../../list-component1.coffee')
template = require('./line-editor.hbs')
_ = require('underscore')

class LineEditorComponent extends ListComponent

  getTemplate: -> template()

  render: ->

    super

    @$el.on 'click', '.add-line-button', =>
      @append({
        transactionId: null
        accountId: null
        amount: 0.00
      })

  _onDestroy: () ->

    return if @model.length < 2

    super


module.exports = LineEditorComponent

