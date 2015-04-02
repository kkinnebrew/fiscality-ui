class ViewModel

  constructor: ->

    @loading = false

  update: ->

  startLoading: ->

    @loading = true

  stopLoading: ->

    @loading = false

  on: (event, callback) ->

  detach: (event, callback) ->

  fire: (event) ->

module.exports = ViewModel