ViewModel = require('../../../common1/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')

class OverlayViewModel extends ViewModel

  constructor: (params) ->

    super

    @accounts = []
    @selectedAccountId = params.accountId || null

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

    @selectedAccountId = accountId

    @fire('select', accountId)

  close: ->

    @fire('close')

module.exports = OverlayViewModel
