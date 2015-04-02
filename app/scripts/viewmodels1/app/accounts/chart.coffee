ViewModel = require('../../../common1/viewmodel.coffee')

class ChartViewModel extends ViewModel

  constructor: (params) ->

    @selectedAccountId = params.accountId || null
    @account = null
    @range = '1M'
    @startDate = new Date(2015, 1, 1)
    @endDate = new Date(2015, 3, 31)

  update: ->

    @startLoading()

    # cancel prior requests

    # do service calls

    @stopLoading()

    @fire('refresh')

  choose: ->

    @fire('choose')

  setAccount: (accountId) ->

    @selectedAccountId = accountId

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