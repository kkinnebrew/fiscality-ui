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
    @isHidden = false

    @update()

  update: ->

    return if !@accountId

    @isHidden = false

    accountRequest = transactionsService.account(@accountId)
    balanceRequest = transactionsService.balance(@accountId)

    $.when(accountRequest, balanceRequest).then((account, balance) =>

      cache.setPersistentItem('accountId', @accountId);

      @account = account
      @balance = balance or 0

      @fire('refresh')

    , -> Log.error('Error loading account for accountId: ' + @selectedAccountId))

  choose: ->

    @fire('choose')

  markHidden: ->

    @isHidden = true

    @fire('refresh')

  markVisible: ->

    @isHidden = false

    @fire('refresh')

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