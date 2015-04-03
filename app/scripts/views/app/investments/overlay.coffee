View = require('../../../common/view.coffee')
$ = require('jquery')

class OverlayView extends View

  bindings:
    '.portfolio-list-item':
      'click': 'onSelect'

  onSelect: (e) =>

    portfolioId = $(e.currentTarget).attr('data-key')

    @viewmodel.setPortfolio(portfolioId)

module.exports = OverlayView