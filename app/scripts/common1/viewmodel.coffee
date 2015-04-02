class ViewModel

  constructor: ->

    @loading = false

    @events = {}

  update: ->

  startLoading: ->

    @loading = true

  stopLoading: ->

    @loading = false

  on: (event, callback) ->

    if !@events.hasOwnProperty(event)
      @events[event] = []

    @events[event].push(callback)

  detach: (event, callback) ->

    if @events.hasOwnProperty(event)
      index = @events[event].indexOf(callback)
      if index != -1
        @events[event].splice(index, 1)

  fire: (event) ->

    args = Array.prototype.slice.call(arguments)

    if @events.hasOwnProperty(event)
      for i in [0...@events[event].length]
        @events[event][i].apply(this, args)

module.exports = ViewModel