ViewModel = require('../../common1/viewmodel.coffee')
authService = require('../../services/auth.coffee')
Log = require('../../common1/log.coffee')

class ResetViewModel extends ViewModel

  constructor: () ->

    super

    @password = null
    @confirm = null

  resetPassword: (password, confirm) ->

    if !password or !confirm or password != confirm
      return Log.warn('Invalid password')

    authService.resetPassword(password, confirm).then =>
     @router.goto('/home/login')
    , ->
      Log.error('Error resetting password')

module.exports = ResetViewModel
