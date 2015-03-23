View = require('../../../common/view')
$ = require('jquery')

class TransactionsView extends View

  load: ->

    @viewModel.on('prefresh', @startLoading)
    @viewModel.on('refresh', @stopLoading)

  render: ->

    super
    @startLoading()

  bind: ->

    @$el.on('click', '.collapse-btn', ->
      $(this).closest('.transaction-row').removeClass('expand')
    )

    @$el.on('click', '.account-names', ->
      $(this).closest('.transaction-row').addClass('expand')
    )


  unbind: ->

    @$el.off('click', '.collapse-btn')
    @$el.off('click', '.account-names')


  startLoading: =>

    if @loading
      return

    @loading = true;

    @$el.css('opacity', 0.5)


  stopLoading: =>

    if !@loading
      return

    @$el.css('opacity', 1)

    @loading = false


module.exports = TransactionsView;