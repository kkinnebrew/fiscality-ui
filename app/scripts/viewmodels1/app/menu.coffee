class MenuViewModel

  constructor: (params) ->

    @state = params.state || 'accounts'

    # make service calls

    @fire('refresh')

  setState: (state) ->

    return if @state == state

    @state = state

    @router.goto('/' + state)

    @fire('refresh')

  logout: ->

    # make service calls

    @router.goto('/home/login')

module.exports = MenuViewModel