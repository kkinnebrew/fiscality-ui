ViewModel = require('../../../common1/viewmodel.coffee')

class OverlayViewModel extends ViewModel

  constructor: (params) ->

    super

    @accounts = []
    @selectedAccountId = params.accountId || null

    @update()

  update: ->

    @startLoading()

    # do service calls

    @stopLoading()

    @fire('refresh')

  setAccount: (accountId) ->

    @selectedAccountId = accountId

    @fire('select', accountId)

  close: ->

    @fire('close')

module.exports = OverlayViewModel