ViewModel = require('../../../common/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
Log = require('../../../common/log.coffee')
_ = require('underscore')

class TransactionsViewModel extends ViewModel

  constructor: (params) ->

    super

    @accountId = params.accountId || null
    @transactions = []
    @keyword = null
    @sortColumn = 'date'

    @update()

  update: ->

    return if !@accountId

    @startLoading()

    transactionsService.transactions(@accountId).then (data) =>

      balance = 0;

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