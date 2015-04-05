ViewModel = require('../../../common/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
Log = require('../../../common/log.coffee')

class OverlayViewModel extends ViewModel

  constructor: (params) ->

    super

    @accounts = []
    @accountId = params.accountId || null

    @refreshAccounts()

  update: ->

    @fire('refresh')

  refreshAccounts: ->

    @startLoading()

    transactionsService.accounts().then (data) =>
      @stopLoading()
      @accounts = data
      @update()
    , ->
      @stopLoading()
      Log.error('Error fetching accounts')

  setAccount: (accountId) ->

    @close if @accountId == accountId

    @accountId = accountId

    @fire('select', accountId)

  connect: ->

    @fire('connect')

  close: ->

    @fire('close')

module.exports = OverlayViewModel
