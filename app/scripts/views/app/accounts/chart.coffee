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

  constructor: ->

    super

    @viewModel.on('prefresh', @startLoading)
    @viewModel.on('refresh', @stopLoading)

  bind: ->

    console.log('bind')

    that = this;

    @$el.on 'click', '.range-picker-item', ->
      that.$el.find('.range-picker-item').removeClass('active')
      $(this).addClass('active');

    @$el.on('click', '.account-selector', (e) -> e.stopPropagation())
    @$el.on('click', '.selector-btn', that.showSelector)
    @$el.on('click', '.account-list-item', that.hideSelector)
    @$el.on('click', '.account-selector-title', that.hideSelector)

  unbind: ->

    @$el.off('click', '.account-selector')
    @$el.off('click', '.selector-btn')
    @$el.off('click', '.account-list-item')
    @$el.off('click', '.account-selector-title')

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

  showSelector: =>

    @$el.find('.account-selector').addClass('visible');
    @$el.find('.chart-container').addClass('blur');

    console.log('show')

  hideSelector: =>

    @$el.find('.account-selector').removeClass('visible');
    @$el.find('.chart-container').removeClass('blur');

    console.log('hide')

module.exports = ChartView