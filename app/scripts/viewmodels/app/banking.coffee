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
    @accountOptions = []
    @account = null
    @balance = '$0.00'
    @transactions = []
    @types = []

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
    typesRequest = transactionsService.types()
    accountsRequest = transactionsService.accounts()

    $.when(accountRequest, balanceRequest, typesRequest, accountsRequest).then((account, balance, types, accounts) =>
      @account = account
      @types = types
      @balance = numberWithSymbolAndCommas(balance)
      @accountOptions = _.map(_.filter(accounts, (account) => account.accountId != @accountId), (account) ->
        return {
          value: account.accountId,
          label: account.accountName
        }
      )
      @fire('refresh', { account: account, balance: @balance, types: types, accountOptions: @accountOptions })
    )

    transactionsRequest = transactionsService.transactions(@accountId)

    map = (transaction) =>
      date = new Date(transaction.transactionDate);
      return {
        transactionId: transaction.transactionId
        date: date.toString('M/d/yyyy')
        transactionType: transaction.transactionType
        description: transaction.description
        amount: numberWithCommas(transaction.amount.toFixed(2)),
        balance: numberWithSymbolAndCommas(transaction.balance),
        editing: false,
        saved: true
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

  createAccount: (account) ->

    return transactionsService.createAccount(account.accountName, account.accountType).then (data) =>
      console.log(data)
      @getAccounts()
    , () =>
      console.log('Error creating account')

  addTransaction: () ->

    date = new Date()

    dateString = date.toString('M/d/yyyy')

    _.each @transactions, (transaction) =>
      transaction.editing = false

    @transactions.unshift({
      transactionId: null
      date: dateString
      transactionType: 'Test'
      description: 'Test'
      amount: 0,
      balance: '0.00',
      editing: true,
      saved: false
    })

    @fire('refresh', transactions: @transactions)

  saveTransaction: (transaction) ->

    date = new Date(transaction.date)

    request = {
      transactionDate: date.toString('yyyy-MM-dd'),
      transactionType: transaction.transactionType,
      description: transaction.description,
      amount: parseFloat(transaction.amount),
      fromAccountId: @accountId,
      toAccountId: transaction.toAccountId
    }

    return transactionsService.addTransaction(request).then () =>
      @update();
    , ->
      Log.error('Error saving transaction')

  editTransaction: (transaction) ->

    date = new Date(transaction.date)

    request = {
      transactionDate: date.toString('yyyy-MM-dd'),
      transactionType: transaction.transactionType,
      description: transaction.description,
      amount: parseFloat(transaction.amount),
      fromAccountId: @accountId,
      toAccountId: transaction.toAccountId
    }

    return transactionsService.editTransaction(transaction.transactionId, request).then () =>
      @update();
    , ->
      Log.error('Error saving transaction')

  removeTransaction: (transactionId) ->

    return transactionsService.removeTransaction(transactionId).then () =>
      @update();
    , ->
      Log.error('Error deleting transaction')

  markEditing: (transactionId) ->

    @transactions = _.map @transactions, (transaction) =>
      if (transaction.transactionId == transactionId)
        transaction.editing = true
      else
        transaction.editing = false
      return transaction

    @fire('refresh', transactions: @transactions)

  clearEditing: (transactionId) ->

    transactions = []

    _.each @transactions, (transaction) =>
      transaction.editing = false
      if (transaction.saved)
        transactions.push(transaction)

    @transactions = transactions

    @fire('refresh', transactions: @transactions)

module.exports = BankingViewModel