Presenter = require('../../../common/presenter.coffee')

class AccountsPresenter extends Presenter

  constructor: (params) ->

    @accountId = params.accountId || null

    @chartViewModel = null
    @transactionsViewModel = null
    @accountsViewModel = null

    @overlayed = false

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

    @hideOverlay()

    @router.goto('app.accounts', {
      accountId: accountId
    })

  showOverlay: =>

    return if @overlayed

    @overlayed = true

    @chartViewModel.markInactive()
    @transactionsViewModel.markInactive()

    @accountsViewModel.overlayed = true
    @router.renderGlobal('accounts')

  showFullOverlay: =>

    return if @overlayed

    @overlayed = true

    @chartViewModel.markInactive()
    @transactionsViewModel.markInactive()

    @accountsViewModel.overlayed = false
    @router.renderGlobal('accounts')

  hideOverlay: () =>

    return if !@overlayed

    @overlayed = false

    @chartViewModel.markActive()
    @transactionsViewModel.markActive()

    @router.destroyGlobal('accounts')

module.exports = AccountsPresenter