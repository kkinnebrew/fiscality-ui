View = require('../../../common/view.coffee')
$ = require('jquery')

class ConnectAccountView extends View

  render: ->

    super

    @$el.addClass('overlayed') if @viewmodel.overlayed

  destroy: (callback) ->

    return if !@rendered

    @viewmodel.detach('refresh', @refresh) if @viewmodel

    @$el.addClass('unrendered')

    @unbind()

    setTimeout =>

      @$el.empty()

      @$el = null

      @rendered = false

      if callback
        callback.call(this)

    , 300

module.exports = ConnectAccountView