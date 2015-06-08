ViewModel = require('../../common/viewmodel.coffee')

class NavigationViewModel extends ViewModel

  constructor: () ->

    super

    hash = location.hash.replace(/(^#\/?)|(\/$)/g, '').split('/')

    @state = hash[1] or 'accounts'

  # make service calls

  setState: (state) ->

    @state = state

    @router.goto('app.' + state)

  logout: ->

    # make service calls

    @router.goto('home.login')

module.exports = NavigationViewModel