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

  transactions: (accountId) ->

    deferred = $.Deferred();

    success = (data) ->

      _.each data, (item) ->
        item.accountNames = _.pluck(item.otherLines, 'accountName').join(', ')

      cache.setItem('transactions:' + accountId, data);
      deferred.resolve(data)

    @cacheGet('/api/accounts/' + accountId + '/transactions').then(success, -> deferred.reject())

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

  onError: (status) ->

    if status == 401
      cache.purge()
      location.hash = '#/home/login'


module.exports = new TransactionsService(baseUrl: require('./config').getBaseUrl(), cache)