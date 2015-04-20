Component = require('../../component.coffee')
template = require('./editor.hbs')
_ = require('underscore')

class EditorComponent extends Component

  constructor: ->

    super

    @original = JSON.parse(JSON.stringify(@model))

    console.log(@model)

  getTemplate: -> return template()

  render: ->

    super

    @$el.find('.line-editor').hide()

    @$el.find('.save-subrow').hide()

    @$el.on 'click', '[data-model="accountNames"]', =>
      @$el.find('.line-editor').toggle()
      if @$el.hasClass('expanded')
        @$el.removeClass('expanded')
      else
        @$el.addClass('expanded')

    @$el.on 'click', '.save-btn', =>
      # make service request

      if @model.transactionId
        @scope.saveTransaction(@model.transactionId, {
          transactionType: @model.transactionType,
          transactionDate: @model.transactionDate,
          description: @model.description,
          lines: _.map(@model.otherLines, (line) -> {
            transactionLineId: line.transactionLineId,
            amount: line.amount,
            accountId: line.accountId
          })
        })
      else
        @scope.addTransaction({
          transactionType: @model.transactionType,
          transactionDate: @model.transactionDate,
          description: @model.description,
          lines: _.map(@model.otherLines, (line) -> {
          transactionLineId: line.transactionLineId,
          amount: line.amount,
          accountId: line.accountId
          })
        })
      @original = JSON.parse(JSON.stringify(@model))
      @$el.find('.save-subrow').hide()


    @$el.on 'click', '.cancel-btn', =>
      @setValue(JSON.parse(JSON.stringify(@original)))
      @$el.find('.save-subrow').hide()


  onChange: ->

    @changed = true

    @$el.find('.save-subrow').show()

module.exports = EditorComponent