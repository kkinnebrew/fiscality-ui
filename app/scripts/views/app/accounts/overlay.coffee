View = require('../../../common/view.coffee')
$ = require('jquery')

class OverlayView extends View

  bindings:
    '.account-list-item':
      'click': 'onSelect'

  onSelect: (e) =>

    accountId = $(e.currentTarget).attr('data-key')

    @viewmodel.setAccount(accountId)

module.exports = OverlayView