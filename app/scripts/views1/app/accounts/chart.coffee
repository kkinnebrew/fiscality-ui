View = require('../../../common1/view.coffee')
$ = require('jquery')

PROGRESS_CONFIG =
  value: 1,
  size: 24,
  thickness: 3,
  fill: {
    color: 'rgba(255, 255, 255, 0.5)'
  }

class ChartView extends View

  bind: ->

    super

    that = this

    @$el.on 'click', '.range-picker-item', ->
      that.$el.find('.range-picker-item').removeClass('active')
      $(this).addClass('active');

  unbind: ->

    @$el.off('click', '.range-picker-item')

module.exports = ChartView