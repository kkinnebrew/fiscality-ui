$ = require('jquery')
_ = require('underscore')
cache = require('../common/cache')
Service = require('../common/service')

class InvestmentsService extends Service

  headers: ->

    authToken = cache.getPersistentItem('authToken')

    if !authToken
      cache.purge()
      location.hash = '#/home/login'

    'X-Auth-Token': authToken

  portfolios: ->
    return @cacheGet('/api/portfolios')

  portfolio: (portfolioId) ->
    return @cacheGet('/api/portfolios/' + portfolioId)

  holdings: (portfolioId) ->
    return @cacheGet('/api/portfolios/' + portfolioId + '/holdings')

  onError: (status) ->

    if status == 401
      cache.purge()
      location.hash = '#/home/login'


module.exports = new InvestmentsService(baseUrl: require('./config').getBaseUrl(), cache)