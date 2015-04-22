ViewModel = require('../../../common/viewmodel.coffee')
transactionsService = require('../../../services/transactions.coffee')
Log = require('../../../common/log.coffee')

class ConnectAccountViewModel extends ViewModel

  constructor: ->

    super

    @accountName = null
    @accountType = null

  create: (accountName, accountType) ->

    return if !accountName or !accountType

    transactionsService.createAccount(accountName, accountType).then (data) =>
      Log.debug('Created account')
      @fire('done')
    , =>
      Log.error('Error creating account')

  close: ->

    @fire('close')

module.exports = ConnectAccountViewModel
