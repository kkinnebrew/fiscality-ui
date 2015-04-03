ViewModel = require('../../common1/viewmodel.coffee')
authService = require('../../services/auth.coffee')
Log = require('../../common1/log.coffee')

class RegisterViewModel extends ViewModel

  constructor: () ->

    super

    @firstName = null
    @lastName = null
    @email = null
    @password = null

  register: (firstName, lastName, email, password) ->

    if !firstName or !lastName or !email or !password
      return Log.warn('Invalid form')

    authService.register(firstName, lastName, email, password).then =>
      @router.goto('/home/login');
    , ->
      Log.error('Error registering')

module.exports = RegisterViewModel
