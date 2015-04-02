$ = require('jquery')
View = require('../../common/view')

class MenuView extends View

  bindings:
    '.menu-item':
      'click': 'onSelect'
    '.settings-button':
      'click': 'onSettings'
    '.logout-btn':
      'click': 'onLogout'

  onSelect: (e) ->

    key = $(e.currentTarget).attr('data-key')

    @viewModel.setState(key)

  onSettings: ->

    @viewModel.setState('settings')

  onLogout: ->

    @viewModel.logout()

module.exports = MenuView