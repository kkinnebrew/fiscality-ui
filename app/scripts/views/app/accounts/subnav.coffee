View = require('../../../common/view')
v$ = require('jquery')

class SubNavView extends View

  constructor: ->

    @code = 'accounts'

    super

    @viewModel.on('prefresh', @startLoading)
    @viewModel.on('refresh', @stopLoading)

  render: ->

    super
    @startLoading()

  startLoading: =>

    if @loading
      return

    @loading = true

    @$el.find('.progress').show().circleProgress({
      value: 1,
      size: 24,
      thickness: 3,
      fill: {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    })

  stopLoading: =>

    if !@loading
      return

    @$el.find('.progress').hide()

    @loading = false


module.exports = SubNavView;

