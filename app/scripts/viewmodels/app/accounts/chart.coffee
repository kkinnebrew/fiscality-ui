ViewModel = require('../../../common/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
$ = require('jquery')
cache = require('../../../common/cache')
Log = require('../../../common/log.coffee')

class ChartViewModel extends ViewModel

  constructor: (params) ->

    super

    @accountId = params.accountId || null
    @account = null
    @range = '1M'
    @startDate = new Date(2015, 1, 1)
    @endDate = new Date(2015, 3, 31)

    @update()

  update: ->

    return if !@accountId

    @startLoading()

    accountRequest = transactionsService.account(@accountId)
    balanceRequest = transactionsService.balance(@accountId)

    $.when(accountRequest, balanceRequest).then((account, balance) =>

      cache.setPersistentItem('accountId', @accountId);

      @account = account
      @balance = balance or 0

      @stopLoading()

      @fire('refresh')

    , =>
      @stopLoading()
      Log.error('Error loading account for accountId: ' + @selectedAccountId))

  choose: ->

    @fire('choose')

  setAccount: (accountId) ->

    @accountId = accountId

    @update()

  setRange: (range) ->

    @range = range

    @update()

  setStartDate: (startDate) ->

    @startDate = startDate

    @update()

  setEndDate: (endDate) ->

    @endDate = endDate

    @update()

module.exports = ChartViewModel