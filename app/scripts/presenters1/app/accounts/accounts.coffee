Presenter = require('../../../common1/presenter.coffee')

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

  selectAccount: (accountId) ->

    @setAccount(accountId)
    @hideOverlay()

    @router.replaceState('/app/accounts/' + accountId)

  showOverlay: =>

    console.log(this)

    @chartViewModel.markHidden()

    @accountsViewModel.overlayed = true
    @router.renderGlobal('accounts')

  showFullOverlay: =>

    @chartViewModel.markHidden()

    @accountsViewModel.overlayed = false
    @router.renderGlobal('accounts')

  hideOverlay: =>

    @chartViewModel.markVisible()

    @router.destroyGlobal('accounts')

module.exports = AccountsPresenter