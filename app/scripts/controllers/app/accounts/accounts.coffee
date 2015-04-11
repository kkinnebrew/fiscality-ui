Controller = require('../../../common/controller.coffee')

class AccountsController extends Controller

  constructor: (params) ->

    @accountId = params.accountId || null

    @chartViewModel = null
    @transactionsViewModel = null
    @accountsViewModel = null
    @connectAccountViewModel = null

    @overlayed = false

  load: ->

    @showFullOverlay() if !@accountId

    @chartViewModel.on('choose', @showOverlay)
    @accountsViewModel.on('close', @hideOverlay)
    @accountsViewModel.on('select', @selectAccount)
    @accountsViewModel.on('connect', @showConnectAccount)
    @connectAccountViewModel.on('close', @hideConnectAccount)
    @connectAccountViewModel.on('done', @doneConnecting)

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

  showConnectAccount: =>

    @chartViewModel.markInactive()
    @transactionsViewModel.markInactive()
    @accountsViewModel.markInactive()

    @router.renderGlobal('connect-account')

  hideConnectAccount: =>

    @chartViewModel.markActive()
    @transactionsViewModel.markActive()
    @accountsViewModel.markActive()

    @router.destroyGlobal('connect-account')

  doneConnecting: =>

    @accountsViewModel.refreshAccounts()
    @hideConnectAccount()

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

module.exports = AccountsController