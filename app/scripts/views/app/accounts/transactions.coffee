View = require('../../../common/view.coffee')
$ = require('jquery')

class TransactionsView extends View

  bind: ->

    super

    @$el.on 'click', '.collapse-btn', ->
      $(this).closest('.transaction-row').removeClass('expand')

    @$el.on 'click', '.account-names', ->
      $(this).closest('.transaction-row').addClass('expand')

  unbind: ->

    @$el.off('click', '.collapse-btn')
    @$el.off('click', '.account-names')

    super


module.exports = TransactionsView