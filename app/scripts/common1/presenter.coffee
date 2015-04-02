_ = require('underscore')

class Presenter

  constructor: ->

  load: ->

  update: ->

  setParams: (params) ->

    _.each params, (value, name) =>
      this[name] = value if this.hasOwnProperty(name)

  bind: ->

  unbind: ->

  destroy: ->

module.exports = Presenter