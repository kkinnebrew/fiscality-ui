View = require('../../../common/view')
$ = require('jquery')

class OverlayView extends View

  bindings:
    '.account-item':
      'click': 'onSelect'

  onSelect: (e) ->

    accountId = $(e.currentTarget).attr('data-key')

    @viewModel.setAccount(accountId)

module.exports = OverlayView