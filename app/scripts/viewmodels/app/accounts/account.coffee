ViewModel = require('../../../common/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
$ = require('jquery')
cache = require('../../../common/cache')
Log = require('../../../common/log.coffee')

numberWithCommas = (x) ->
  parts = x.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  parts.join(".")

class AccountViewModel extends ViewModel

  constructor: (params) ->

    super

    @accountId = params.accountId || null
    @account = null
    @balance = 0

    @update()

  update: ->

    return if !@accountId

    accountRequest = transactionsService.account(@accountId)
    balanceRequest = transactionsService.balance(@accountId)

    $.when(accountRequest, balanceRequest).then((account, balance) =>

      cache.setPersistentItem('accountId', @accountId);

      @account = { name: account.accountName, type: account.accountType }
      @balance = if !isNaN(balance) then numberWithCommas(balance.toFixed(2)) else 0

      @fire('refresh', { account: @account, balance: @balance })

    , =>
      @stopLoading()
      Log.error('Error loading account for accountId: ' + @accountId))

  choose: ->

    @fire('choose')

  setAccount: (accountId) ->

    @accountId = accountId

    @update()

module.exports = AccountViewModel