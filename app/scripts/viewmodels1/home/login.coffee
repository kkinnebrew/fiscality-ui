ViewModel = require('../../common1/viewmodel.coffee')
authService = require('../../services/auth.coffee')
Log = require('../../common1/log.coffee')

class LoginViewModel extends ViewModel

  constructor: () ->

    super

    @email = null
    @password = null

  login: (email, password) ->

    authService.login(email, password).then =>
      @router.goto('/app/accounts')
    , ->
      Log.error('Unable to login to account')

module.exports = LoginViewModel
