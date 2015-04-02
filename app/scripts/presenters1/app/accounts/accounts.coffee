Presenter = require('../../../common1/presenter.coffee')

class AccountsPresenter extends Presenter

  constructor: (params, @chartViewModel, @transactionsViewModel, @overlayViewModel) ->

    @accountId = params.accountId || null

  load: ->

    @showOverlay() if !@accountId

  update: ->

    @showOverlay() if !@accountId

  bind: ->

    @chartViewModel.on('choose', @showOverlay)
    @overlayViewModel.on('close', @hideOverlay)
    @overlayViewModel.on('select', @selectAccount)

  setAccount: (accountId) ->

    @chartViewModel.setAccount(accountId)
    @transactionsViewModel.setAccount(accountId)
    @overlayViewModel.setAccount(accountId)

  selectAccount: (accountId) ->

    @setAccount(accountId)
    @hideOverlay()

    @router.replaceState('/app/accounts/' + accountId)

  showOverlay: ->

    @router.renderGlobal('accounts')

  hideOverlay: ->

    @router.destroyGlobal('accounts')

module.exports = AccountsPresenter