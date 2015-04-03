Presenter = require('../../../common/presenter.coffee')

class AccountsPresenter extends Presenter

  constructor: (params) ->

    @accountId = params.accountId || null

    @chartViewModel = null
    @transactionsViewModel = null
    @accountsViewModel = null

  load: ->

    @showFullOverlay() if !@accountId

    @chartViewModel.on('choose', @showOverlay)
    @accountsViewModel.on('close', @hideOverlay)
    @accountsViewModel.on('select', @selectAccount)

  update: ->

    @showFullOverlay() if !@accountId

  setAccount: (accountId) ->

    @chartViewModel.setAccount(accountId)
    @transactionsViewModel.setAccount(accountId)
    @accountsViewModel.setAccount(accountId)

  selectAccount: (accountId) =>

    @chartViewModel.setAccount(accountId)
    @transactionsViewModel.setAccount(accountId)

    @hideOverlay().always =>
      @router.goto('/app/accounts/' + accountId)

  showOverlay: =>

    @chartViewModel.markInactive()
    @transactionsViewModel.markInactive()

    @accountsViewModel.overlayed = true
    @router.renderGlobal('accounts')

  showFullOverlay: =>

    @chartViewModel.markInactive()
    @transactionsViewModel.markInactive()

    @accountsViewModel.overlayed = false
    @router.renderGlobal('accounts')

  hideOverlay: =>

    @chartViewModel.markActive()
    @transactionsViewModel.markActive()

    return @router.destroyGlobal('accounts')

module.exports = AccountsPresenter