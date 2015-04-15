View = require('../../../common/view.coffee')
editorTemplate = require('../../../../templates/app/accounts/editor.hbs')
addLineTemplate = require('../../../../templates/app/accounts/add-line.hbs')
$ = require('jquery')

class TransactionsView extends View

  bind: ->

    super

    that = this

    @$el.on 'click', '.detail-btn', ->
      row = $(this).closest('.transaction-viewer')
      if row.hasClass('expanded')
        row.removeClass('expanded')
      else
        row.addClass('expanded')

    @$el.on 'click', '.edit-btn', ->
      row = $(this).closest('.transaction-group')
      row.find('.transaction-viewer').hide()
      transactionId = row.attr('data-key')
      transaction = that.viewmodel.getTransaction(transactionId)
      transaction.accounts = that.viewmodel.accounts
      row.append(editorTemplate(transaction))
      row.find('select[data-value]').each ->
        val = $(this).attr('data-value')
        $(this).val(val)

    @$el.on 'click', '.delete-btn', ->
      # run service request
      $(this).closest('.transaction-group').remove()

    @$el.on 'click', '.add-row-btn', ->
      row = $(this).closest('.transaction-editor')
      accounts = that.viewmodel.accounts
      $(addLineTemplate({ accounts: accounts })).insertBefore(row.find('.add-line-row'))

    @$el.on 'click', '.delete-row-btn', ->
      lines = $(this).closest('.transaction-editor').find('.line-row')
      if lines.length > 1
        $(this).closest('.line-row').remove()

    @$el.on 'click', '.cancel-btn', ->
      row = $(this).closest('.transaction-group')
      row.find('.transaction-viewer').show()
      row.find('.transaction-editor').remove()

    @$el.on 'click', '.save-btn', ->
      row = $(this).closest('.transaction-group')
      row.find('.transaction-viewer').show()
      # get data and do stuff
      row.find('.transaction-editor').remove()

  unbind: ->

    @$el.off('click', '.detail-btn')
    @$el.off('click', '.edit-btn')
    @$el.off('click', '.delete-btn')
    @$el.off('click', '.add-row-btn')
    @$el.off('click', '.delete-row-btn')
    @$el.off('click', '.cancel-btn')
    @$el.off('click', '.save-btn')

    super


module.exports = TransactionsView