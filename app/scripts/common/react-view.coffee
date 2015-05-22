$ = require('jquery')
_ = require('underscore')
Log = require('./log.coffee')
React = require('react')

class ReactView

  constructor: (template, viewmodel) ->

    @template = template

    @react = null

    @$el = null

    @rendered = false

    @viewmodel = viewmodel || null

  render: ($el) ->

    return if @rendered

    @$el = $el

    @react = React.render(React.createElement(@template, {
      viewmodel: @viewmodel
    }), @$el.get(0))

    @bind()

    @viewmodel.on('refresh', @refresh)

    @rendered = true

  refresh: (state) =>

    return Log.warn('Cannot refresh unrendered view') if !@rendered

    console.log('refresh', state)

    @react.setState(state)

    Log.debug('Refreshing view "' + @constructor.name + '"')

  bind: ->

  unbind: ->

  destroy: (callback) ->

    return if !@rendered

    @viewmodel.detach('refresh', @refresh) if @viewmodel

    @unbind()

    @$el.empty()

    @$el = null

    @react = null

    @rendered = false

    if callback
      callback.call(this)

module.exports = ReactView