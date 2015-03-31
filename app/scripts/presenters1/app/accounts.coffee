class AccountsPresenter

  constructor: (@chartViewModel, @transactionsViewModel, @overlayViewModel) ->

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

    @router.renderGlobal('accounts', @overlayViewModel)

  hideOverlay: ->

    @router.destroyGlobal('accounts')

