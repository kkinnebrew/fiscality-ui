ViewModel = require('../../../common1/viewmodel.coffee')

class TransactionsViewModel extends ViewModel

  constructor: (params) ->

    @selectedAccountId = params.accountId || null
    @transactions = []
    @keyword = null
    @sortColumn = 'date'

  update: ->

    @startLoading()
    
    # do service calls

    @stopLoading()

    @fire('refresh')

  sortBy: (column) ->

    @sortColumn = column

    @update()

  setKeyword: (keyword) ->

    @keyword = keyword

    @update()

  setAccount: (accountId) ->

    @selectedAccountId = accountId

    @update()

module.exports = TransactionsViewModel