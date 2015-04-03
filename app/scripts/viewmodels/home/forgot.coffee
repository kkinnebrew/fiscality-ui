ViewModel = require('../../common/viewmodel.coffee')
authService = require('../../services/auth.coffee')
Log = require('../../common/log.coffee')

class ForgotViewModel extends ViewModel

  constructor: () ->

    super

    @email = null

  forgotPassword: (email) ->

    if !email
      return Log.warn('Invalid email address')

    authService.forgotPassword(email).then =>
      @router.goto('/home/login')
    , ->
      Log.error('Unable to process request')

module.exports = ForgotViewModel
