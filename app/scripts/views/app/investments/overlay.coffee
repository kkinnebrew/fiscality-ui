View = require('../../../common/view.coffee')
$ = require('jquery')

class OverlayView extends View

  bindings:
    '.portfolio-list-item':
      'click': 'onSelect'

  render: ->

    super

    @$el.addClass('overlayed') if @viewmodel.overlayed

  destroy: (callback) ->

    return if !@rendered

    @viewmodel.detach('refresh', @refresh) if @viewmodel

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

    portfolioId = $(e.currentTarget).attr('data-key')

    @viewmodel.setPortfolio(portfolioId)

module.exports = OverlayView