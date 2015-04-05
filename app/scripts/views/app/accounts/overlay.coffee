View = require('../../../common/view.coffee')
$ = require('jquery')

class OverlayView extends View

  bindings:
    '.selector-list-item:not(.ignore)':
      'click': 'onSelect'

  render: ->

    super

    @$el.addClass('overlayed') if @viewmodel.overlayed

  destroy: (callback) ->

    return if !@rendered

    @viewmodel.detach('refresh', @refresh) if @viewmodel

    @$el.addClass('unrendered')

    @$el.removeClass('rendered')

    @unbind()

    setTimeout =>

      @$el.empty()

      @$el = null

      @rendered = false

      if callback
        callback.call(this)

    , 150

  onSelect: (e) =>

    accountId = $(e.currentTarget).attr('data-key')

    @viewmodel.setAccount(accountId)

module.exports = OverlayView