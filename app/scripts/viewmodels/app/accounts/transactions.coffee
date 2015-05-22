ViewModel = require('../../../common/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
Log = require('../../../common/log.coffee')
_ = require('underscore')
$ = require('jquery')

class TransactionsViewModel extends ViewModel

  constructor: (params) ->

    super

    @accountId = params.accountId || null

    @account = null
    @transactions = []

    @sort = 'date'
    @direction = 'asc'

    @update()

  update: ->

    return if !@accountId

    transactionsRequest = transactionsService.transactions(@accountId)

    map = (transaction) =>
      date: transaction.transactionDate
      transactionType: transaction.transactionType
      description: transaction.description
      amount: transaction.debitAmount - transaction.creditAmount,
      balance: 1000.00

    $.when(transactionsRequest).then (transactions) =>
      @transactions = _.sortBy(_.map(transactions, map), 'date').reverse()
      @fire('refresh', transactions: @transactions)
    , () ->
      console.log('Error fetching transactions')

  setAccount: (accountId) ->

    @accountId = accountId

    @update()


  sortBy: (column) ->

    if @sort == column
      if @direction == 'asc'
        @direction = 'desc'
        @transactions.reverse()
        @fire('refresh', { transactions: @transactions, direction: @direction, sort: @sort })
      else
        @direction = 'asc'
        @transactions.reverse()
        @fire('refresh', { transactions: @transactions, direction: @direction, sort: @sort })
    else
      @sort = column
      @direction = 'asc'
      @transactions = _.sortBy(@transactions, column)
      @fire('refresh', { transactions: @transactions, direction: @direction, sort: @sort })

module.exports = TransactionsViewModel