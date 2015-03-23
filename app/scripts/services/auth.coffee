$ = require('jquery');
transactionsAPI = require('./transactions.coffee');
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
      cache.setPersistentItem('authToken', user.sessionId);
      transactionsAPI.accounts().then((data) ->
        data.reverse();
        if data && data.length > 0 then cache.setPersistentItem('accountId', data[0].accountId)
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