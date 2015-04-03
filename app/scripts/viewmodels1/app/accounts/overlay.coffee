ViewModel = require('../../../common1/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
Log = require('../../../common1/log.coffee')

class OverlayViewModel extends ViewModel

  constructor: (params) ->

    super

    @accounts = []
    @accountId = params.accountId || null

    transactionsService.accounts().then (data) =>
      @stopLoading()
      @accounts = data
      @update()
    , ->
      @stopLoading()
      Log.error('Error fetching accounts')

  update: ->

    @fire('refresh')

  setAccount: (accountId) ->

    @accountId = accountId

    @fire('select', accountId)

  close: ->

    @fire('close')

module.exports = OverlayViewModel
