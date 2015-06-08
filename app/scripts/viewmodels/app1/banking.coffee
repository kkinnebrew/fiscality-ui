ViewModel = require('../../common/viewmodel.coffee')
transactionsService = require('../../services/transactions.coffee')
Log = require('../../common/log.coffee')
$ = require('jquery')
_ = require('underscore')

numberWithCommas = (x) ->
  parts = x.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  parts.join(".")

class BankingViewModel extends ViewModel

  constructor: (params) ->

    super

    @accountId = params.accountId || null
    @accounts = []
    @account = null
    @balance = 0
    @transactions = []

    # make service calls

    @update() if @accountId

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
        date: date.toString('M/d/yyyy')
        transactionType: transaction.transactionType
        description: transaction.description
        amount: numberWithCommas(transaction.debitAmount - transaction.creditAmount),
        balance: '$1,000.00'
      }

    $.when(transactionsRequest).then (transactions) =>
      @transactions = _.map(_.sortBy(transactions, 'transactionDate'), map).reverse()
      @fire('refresh', transactions: @transactions)
    , () ->
      console.log('Error fetching transactions')

  getAccounts: () ->

    transactionsService.accounts().then (data) =>
      @accounts = data
      @fire('refresh', { accounts: data })
    , ->
      Log.error('Error fetching accounts')

  setAccount: (accountId) ->

    @router.goto('app.accounts', {
      accountId: accountId
    })

module.exports = BankingViewModel