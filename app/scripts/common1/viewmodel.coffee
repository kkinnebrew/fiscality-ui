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

console.log('1234')

module.exports = ViewModel