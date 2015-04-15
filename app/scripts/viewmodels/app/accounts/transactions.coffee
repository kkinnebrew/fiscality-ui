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

    @update()

  getTransaction: (transactionId) ->

    return _.find @transactions, (transaction) ->
      return transaction.transactionId == transactionId

  update: ->

    return if !@accountId

    @startLoading()

    transactionsRequest = transactionsService.transactions(@accountId)
    accountsRequest = transactionsService.accounts()

    $.when(transactionsRequest, accountsRequest).then (data, accounts) =>

      balance = 0;

      @accounts = _.sortBy(accounts, 'accountName')

      console.log(accounts)

      @transactions = _.sortBy(data, 'transactionDate');
      @transactions = _.map @transactions, (item) ->

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