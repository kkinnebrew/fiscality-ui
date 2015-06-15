ViewModel = require('../../common/viewmodel.coffee')
transactionsService = require('../../services/transactions.coffee')
Log = require('../../common/log.coffee')
$ = require('jquery')
_ = require('underscore')

numberWithCommas = (x) ->
  parts = x.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  parts.join(".")

numberWithSymbolAndCommas = (x) ->
  value = if isNaN(x) then parseFloat(x) else x
  return if value >= 0 then ('$' + numberWithCommas(value.toFixed(2))) else ('-$' + numberWithCommas(Math.abs(value).toFixed(2)))


class BankingViewModel extends ViewModel

  constructor: (params) ->

    super

    @accountId = params.accountId || null
    @accounts = []
    @account = null
    @balance = 0
    @transactions = []

    # make service calls

    if !@accountId
      @getAccounts().then () =>
        if @accounts && @accounts.length > 0
          @accountId = @accounts[0].accountId
          @update()
    else
      @update()

  update: () ->

    accountRequest = transactionsService.account(@accountId)
    balanceRequest = transactionsService.balance(@accountId)

    $.when(accountRequest, balanceRequest).then((account, balance) =>
      @account = account
      @balance = balance
      @fire('refresh', { account: account, balance: numberWithCommas(balance) })
    )

    transactionsRequest = transactionsService.transactions(@accountId)

    map = (transaction) =>
      date = new Date(transaction.transactionDate);
      return {
        transactionId: transaction.transactionId
        date: date.toString('M/d/yyyy')
        transactionType: transaction.transactionType
        description: transaction.description
        amount: numberWithCommas(transaction.amount),
        balance: numberWithSymbolAndCommas(transaction.balance),
        editing: false
      }

    $.when(transactionsRequest).then (transactions) =>
      @transactions = _.map(transactions, map).reverse()
      @fire('refresh', transactions: @transactions)
    , () ->
      console.log('Error fetching transactions')

  getAccounts: () ->

    return transactionsService.accounts().then (data) =>
      @accounts = data
      @fire('refresh', { accounts: data })
    , ->
      Log.error('Error fetching accounts')

  setAccount: (accountId) ->

    @router.goto('app.accounts', {
      accountId: accountId
    })

  addTransaction: () ->

    date = new Date()

    dateString = date.toString('M/d/yyyy')

    @transactions.unshift({
      transactionId: '-1'
      date: dateString
      transactionType: 'Test'
      description: 'Test'
      amount: 0,
      balance: '0',
      editing: true
    })

    @fire('refresh', transactions: @transactions)


  editTransaction: (transaction) ->

#    console.log(transaction)
#
#    request = {
#      transactionDate: transaction.date,
#      transactionType: transaction.transactionType,
#      description: transaction.description,
#      lines: [
#        { accountId: '', amount: '' },
#        { accountId: '', amount: '' }
#      ]
#    }
#
#    transactionsService.editTransaction(transaction.transactionId, request).then () =>
#
#      console.log('successfully saved')
#
#      el = _.find(@transactions, (item) ->
#        return item.transactionId == transaction.transactionId
#      )
#
#      el.date = transaction.date;
#      el.transactionType = transaction.transactionType;
#      el.description = transaction.description;
#      el.amount = transaction.amount;
#
#    , () =>
#      console.log('Error saving edit')

    @clearEditing()

  markEditing: (transactionId) ->

    @transactions = _.map @transactions, (transaction) =>
      if (transaction.transactionId == transactionId)
        transaction.editing = true
      else
        transaction.editing = false
      return transaction

    @fire('refresh', transactions: @transactions)

  clearEditing: (transactionId) ->

    @transactions = _.map @transactions, (transaction) =>
      transaction.editing = false
      return transaction

    @fire('refresh', transactions: @transactions)

module.exports = BankingViewModel