_ = require('underscore')

class Controller

  constructor: ->

  load: ->

  update: ->

  setParams: (params, ignore) ->

    changed = false

    _.each params, (value, name) =>
      if this.hasOwnProperty(name) and this[name] != value
        this[name] = value
        changed = true

    @update() if changed && !ignore

  bind: ->

  unbind: ->

  destroy: ->

module.exports = Controller