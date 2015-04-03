View = require('../../../common/view.coffee')
$ = require('jquery')

class OverlayView extends View

  bindings:
    '.account-list-item':
      'click': 'onSelect'

  render: ->

    super

    setTimeout(() =>
      @$el.find('#accounts-overlay').addClass('activate')
    , 0)

  destroy: ->

    deferred = $.Deferred()

    if !@rendered
      deferred.resolve()
      return deferred

    @viewmodel.detach('refresh', @refresh) if @viewmodel

    @unbind()

    @$el.find('#accounts-overlay').removeClass('activate')

    setTimeout =>

      @$el.empty()

      @$el = null

      @rendered = false

      deferred.resolve()

    , 100

    return deferred


  onSelect: (e) =>

    accountId = $(e.currentTarget).attr('data-key')

    @viewmodel.setAccount(accountId)

module.exports = OverlayView