$ = require('jquery');
transactionsAPI = require('./transactions.coffee');
investmentsAPI = require('./investments.coffee');
cache = require('../common/cache');
Service = require('../common/service');

class AuthService extends Service

  headers: (url) ->

    if url == '/api/logout'

      authToken = cache.getPersistentItem('authToken')

      if !authToken
        cache.purge()
        location.hash = '#/home/login'

      { 'X-Auth-Token': authToken }

    else {}

  login: (email, password) ->

    deferred = $.Deferred()

    success = (user) ->
      cache.setPersistentItem('authToken', user.sessionId)
      accountsRequest = transactionsAPI.accounts()
      portfoliosRequest = investmentsAPI.portfolios()
      $.when(accountsRequest, portfoliosRequest).then((accounts, portfolios) ->
        if accounts && accounts.length > 0
          accounts.reverse()
          cache.setPersistentItem('accountId', accounts[0].accountId)
        if portfolios && portfolios.length > 0
          cache.setPersistentItem('portfolioId', portfolios[0].portfolioId)
        deferred.resolve(user)
      , -> deferred.reject())

    @post('/api/login', {
      email: email,
      password: password
    }).then(success, -> deferred.reject())

    return deferred

  register: (firstName, lastName, email, password) ->
    return @post('/api/register', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })

  forgotPassword: (email) ->
    return @post('/api/forgotpassword', email: email)

  resetPassword: (password, confirm) ->
    return @post('/api/changepassword', {
      password: password,
      confirm: confirm
    })

  logout: ->
    deferred = $.Deferred()
    @get('/api/logout').then(->
      cache.purge()
      deferred.resolve()
    , -> deferred.reject())
    return deferred


module.exports = new AuthService(baseUrl: require('./config').getBaseUrl())