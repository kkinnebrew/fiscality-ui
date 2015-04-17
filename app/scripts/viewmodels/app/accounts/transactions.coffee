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
    @accounts = []
    @keyword = null
    @sortColumn = 'date'

    #@update()

  getTransaction: (transactionId) ->

    return _.find @transactions, (transaction) ->
      return transaction.transactionId == transactionId

  addTransaction: (data) ->

    return transactionsService.addTransaction(data).then =>
      @update()
    , ->
      Log.error('Error adding transaction')

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