Presenter = require('../../../common1/presenter.coffee')

class AccountsPresenter extends Presenter

  constructor: (params) ->

    @accountId = params.accountId || null

    @chartViewModel = null
    @transactionsViewModel = null
    @accountsViewModel = null

  load: ->

    @showOverlay() if !@accountId

    @chartViewModel.on('choose', @showOverlay)
    @accountsViewModel.on('close', @hideOverlay)
    @accountsViewModel.on('select', @selectAccount)

  update: ->

    @showOverlay() if !@accountId

  setAccount: (accountId) ->

    @chartViewModel.setAccount(accountId)
    @transactionsViewModel.setAccount(accountId)
    @accountsViewModel.setAccount(accountId)

  selectAccount: (accountId) ->

    @setAccount(accountId)
    @hideOverlay()

    @router.replaceState('/app/accounts/' + accountId)

  showOverlay: ->

    @router.renderGlobal('accounts')

  hideOverlay: ->

    @router.destroyGlobal('accounts')

module.exports = AccountsPresenter