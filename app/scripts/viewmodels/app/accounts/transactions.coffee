ViewModel = require('../../../common/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
Log = require('../../../common/log.coffee')
_ = require('underscore')
$ = require('jquery')

class TransactionsViewModel extends ViewModel

  constructor: (params) ->

    super

    @accountId = params.accountId || null
    @transactions = []
    @transactionTypes = []
    @accounts = []
    @keyword = null
    @sortColumn = 'date'
    @account = null

    @update()

  getTransaction: (transactionId) ->

    return _.find @transactions, (transaction) ->
      return transaction.transactionId == transactionId

  addTransaction: (data) ->

    # compute positive direction

    direction = if @account.accountType == 'Asset' or @account.accountType == 'Expense' then 1 else -1

    # compute line sum

    lines = []

    sum = 0

    _.each data.lines, (data) ->

      amount = parseFloat(data.amount)
      sum += amount

      line = {}

      line.accountId = data.accountId

      if amount > 0 and direction == 1
        line.debitAmount = if direction = 1 then 0 else amount
        line.creditAmount = if direction = 1 then amount else 0
      else
        line.debitAmount = if direction = 1 then Math.abs(amount) else 0
        line.creditAmount = if direction = 1 then 0 else Math.abs(amount)

      lines.push(line)

    # flip sign

    sum = sum * direction

    # build transaction object

    line = {}

    line.accountId = @accountId

    if sum > 0
      line.debitAmount = Math.abs(sum)
      line.creditAmount = 0
    else
      line.debitAmount = 0
      line.creditAmount = Math.abs(sum)

    lines.push(line)

    request = {}

    request.transactionDate = data.transactionDate
    request.transactionType = data.transactionType
    request.description = data.description
    request.lines = lines

    console.log(request)

    return transactionsService.addTransaction(request).then =>
      @update()
    , ->
      Log.error('Error saving transaction')


  saveTransaction: (transactionId, data) ->

    return transactionsService.editTransaction(transactionId, data).then =>
      @update()
    , ->
      Log.error('Error saving transaction')

  deleteTransaction: (transactionId) ->

    return transactionsService.deleteTransaction(transactionId).then =>
      @update()
    , ->
      Log.error('Error deleting transaction')

  update: ->

    return if !@accountId

    @startLoading()

    that = this

    transactionsRequest = transactionsService.transactions(@accountId)
    accountsRequest = transactionsService.accounts()

    $.when(transactionsRequest, accountsRequest).then (data, accounts) =>

      balance = 0;


      @accounts = _.sortBy(_.filter(accounts, (account) -> account.accountId != that.accountId ), 'accountName')

      @account = _.find(accounts, (account) -> account.accountId == that.accountId)

      @accountOptions = _.map(@accounts, (account) -> { value: account.accountId, label: account.accountName })

      @transactions = _.sortBy(data, 'transactionDate');
      @transactions = _.map @transactions, (item) ->

        item.accountNames = if item.accountNames.length > 45 then item.accountNames.substring(0, 45) + '...' else item.accountNames

        item.amount = item.debitAmount - item.creditAmount;
        item.balance = balance = balance + item.debitAmount - item.creditAmount;

        _.each item.otherLines, (line) ->
          line.amount = line.creditAmount - line.debitAmount;

        return item

      @transactions.reverse();

      setTimeout =>
        @stopLoading()

        @fire('refresh')
      , 1000

    , () =>

      @stopLoading()
      Log.error('Unable to fetch transactions')


  sortBy: (column) ->

    @sortColumn = column

    @update()

  setKeyword: (keyword) ->

    @keyword = keyword

    @update()

  setAccount: (accountId) ->

    @selectedAccountId = accountId

    @update()

module.exports = TransactionsViewModel