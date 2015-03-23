View = require('../../../common/view')
$ = require('jquery')

PROGRESS_CONFIG =
  value: 1,
  size: 24,
  thickness: 3,
  fill: {
    color: 'rgba(255, 255, 255, 0.5)'
  }

class ChartView extends View

  setup: ->

    @viewModel.on('prefresh', @startLoading)
    @viewModel.on('refresh', @stopLoading)

  bind: ->

    that = this;

    that.$el.on 'click', '.range-picker-item', ->
      that.$el.find('.range-picker-item').removeClass('active')
      $(this).addClass('active');

  render: ->

    super
    @startLoading

  startLoading: =>

    if @loading
      return

    @loading = true

    @$el.find('.account-info').css('opacity', 0.5)
    @$el.find('.progress').show().circleProgress(PROGRESS_CONFIG)

  stopLoading: =>

    if !@loading
      return

    @$el.find('.account-info').css('opacity', 1)
    @$el.find('.progress').hide()

    @loading = false


module.exports = ChartView