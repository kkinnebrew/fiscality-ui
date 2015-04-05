ViewModel = require('../../common/viewmodel.coffee')
authService = require('../../services/auth.coffee')
Log = require('../../common/log.coffee')

class ResetViewModel extends ViewModel

  constructor: () ->

    super

    @password = null
    @confirm = null

  resetPassword: (password, confirm) ->

    if !password or !confirm or password != confirm
      return Log.warn('Invalid password')

    authService.resetPassword(password, confirm).then =>
     @router.goto('home.login')
    , ->
      Log.error('Error resetting password')

module.exports = ResetViewModel
