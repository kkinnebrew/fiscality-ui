$ = require('jquery')
_ = require('underscore')
cache = require('../common/cache')
Service = require('../common/service')

class TransactionsService extends Service

  headers: ->

    authToken = cache.getPersistentItem('authToken')

    if !authToken
      cache.purge()
      location.hash = '#/home/login'

    'X-Auth-Token': authToken

  types: ->

    @get('/api/transactions/types')

  transactions: (accountId) ->

    deferred = $.Deferred();

    success = (data) ->

      _.each data, (item) ->
        item.accountNames = _.pluck(item.otherLines, 'accountName').join(', ')

      cache.setItem('transactions:' + accountId, data);
      deferred.resolve(data)

    @get('/api/accounts/' + accountId + '/transactions?startDate=2015-01-01').then(success, -> deferred.reject())

    return deferred

  accounts: ->

    return @cacheGet('/api/accounts')

  account: (accountId) ->

    return @cacheGet('/api/accounts/' + accountId)

  createAccount: (accountName, accountType) ->

    return @post('/api/accounts/add', {
      accountName: accountName,
      accountType: accountType
    }).then (data) =>
      cache.clear()

  balance: (accountId) ->

    return @cacheGet('/api/accounts/' + accountId + '/balance')

  addTransaction: (data) ->

    return @post('/api/transactions/add', data)

  editTransaction: (transactionId, data) ->

    return @post('/api/transactions/' + transactionId + '/edit', data)

  deleteTransaction: (transactionId) ->

    return @get('/api/transactions/' + transactionId + '/remove')

  onError: (status) ->

    if status == 401
      cache.purge()
      location.hash = '#/home/login'


module.exports = new TransactionsService(baseUrl: require('./config').getBaseUrl(), cache)