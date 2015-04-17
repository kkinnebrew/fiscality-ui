View = require('../../../common/view.coffee')
editorTemplate = require('../../../../templates/app/accounts/editor.hbs')
addLineTemplate = require('../../../../templates/app/accounts/add-line.hbs')
addTransactionTemplate = require('../../../../templates/app/accounts/add-transaction.hbs')
Log = require('../../../common/log.coffee')
EditorComponent = require('../../../components/app/accounts/editor.coffee')
$ = require('jquery')
#
#class TransactionsView extends View
#
#  bindings:
#    '.detail-btn':
#      'click': 'onDetail'
#    '.edit-btn':
#      'click': 'onEdit'
#    '.delete-btn':
#      'click': 'onDelete'
#    '.add-row-btn':
#      'click': 'onAddLine'
#    '.delete-row-btn':
#      'click': 'onDeleteLine'
#    '.cancel-btn':
#      'click': 'onCancelEdit'
#    '.save-btn':
#      'click': 'onSaveEdit'
#    '.insert-btn':
#      'click': 'onInsert'
#
#
#
#  onDetail: (e) =>
#
#    row = $(e.currentTarget).closest('.transaction-viewer')
#    if row.hasClass('expanded')
#      row.removeClass('expanded')
#    else
#      row.addClass('expanded')
#
#  onEdit: (e) =>
#    row = $(e.currentTarget).closest('.transaction-group')
#    row.find('.transaction-viewer').hide()
#    transactionId = row.attr('data-key')
#    transaction = this.viewmodel.getTransaction(transactionId)
#    transaction.accounts = this.viewmodel.accounts
#    row.append(editorTemplate(transaction))
#    row.find('select[data-value]').each ->
#      val = $(this).attr('data-value')
#      $(this).val(val)
#
#  onDelete: (e) =>
#    transactionId = $(e.currentTarget).closest('.transaction-group').attr('data-key')
#    @viewmodel.deleteTransaction(transactionId)
#    console.log('Deleting transaction ' + transactionId)
#    # run service request
#    # $(e.currentTarget).closest('.transaction-group').remove()
#
#  onAddLine: (e) =>
#    row = $(e.currentTarget).closest('.transaction-editor')
#    accounts = this.viewmodel.accounts
#    $(addLineTemplate({ accounts: accounts })).insertBefore(row.find('.add-line-row'))
#
#  onDeleteLine: (e) =>
#    lines = $(e.currentTarget).closest('.transaction-editor').find('.line-row')
#    if lines.length > 1
#      $(e.currentTarget).closest('.line-row').remove()
#
#  onCancelEdit: (e) =>
#    row = $(e.currentTarget).closest('.transaction-group')
#    if !row.attr('data-key')
#      row.remove()
#    else
#      row.find('.transaction-viewer').show()
#      row.find('.transaction-editor').remove()
#
#  onSaveEdit: (e) =>
#    row = $(e.currentTarget).closest('.transaction-group')
#    transactionId = row.attr('data-key')
#    that = this
#    if !transactionId
#      data = {}
#      data.transactionDate = Date.parse(row.find('[name="transactionDate"]').val()).toString('yyyy-MM-dd')
#      data.transactionType = row.find('[name="transactionType"]').val()
#      data.description = row.find('[name="description"]').val()
#      data.lines = []
#      sum = 0
#      $(row).find('.line-row').each ->
#        amount = parseFloat($(this).find('[name="amount"]').val())
#        sum += parseFloat(amount)
#        data.lines.push({
#          accountId: $(this).find('[name="accountId"]').val()
#          debitAmount: if amount > 0 then 0 else Math.abs(amount)
#          creditAmount: if amount > 0 then Math.abs(amount) else 0
#        })
#      data.lines.push({
#        accountId: @viewmodel.accountId
#        debitAmount: if sum > 0 then Math.abs(sum) else 0
#        creditAmount: if sum > 0 then 0 else Math.abs(sum)
#      })
#      @viewmodel.addTransaction(data)
##    row.find('.transaction-viewer').show()
##    # get data and do stuff
##    row.find('.transaction-editor').remove()
#
#  onInsert: (e) =>
#    row = $(e.currentTarget).closest('.transaction-group')
#    currentDate = row.find('[data-column="transactionDate"]').text()
#    accounts = this.viewmodel.accounts
#    $(addTransactionTemplate({
#      accounts: accounts,
#      currentDate: currentDate
#    })).insertBefore(row)

TransactionEditorComponent = require('../../../components/app/accounts/editor.coffee')

class TransactionsView extends View

  render: ->

    super

    component = new EditorComponent(@$el.find('#editor'), {
      transactionId: '123',
      transactionDate: '01/01/2015',
      transactionType: 'Buy To Open',
      color: '$F00',
      description: 'This is a transaction',
      lines: [
        {
          amount: 100,
          accountId: '234'
        },
        {
          amount: -100,
          accountId: '847'
        }
      ]
    }, {
      accounts: [{
        value: '234',
        label: 'My Account One'
      }, {
        value: '847',
        label: 'Other Account'
      }],
      transactionTypes: [
        'Deposit',
        'Withdrawal',
        'Transfer',
        'Buy To Open',
        'Sell To Close'
      ]
    })

    component.render()

    setInterval(->
      console.log(component.getValue())
    , 5000)



module.exports = TransactionsView