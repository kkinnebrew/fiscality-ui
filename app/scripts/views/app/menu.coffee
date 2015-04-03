$ = require('jquery')
View = require('../../common/view.coffee')

class MenuView extends View

  bindings:
    '.nav-list-item':
      'click': 'onSelect'
    '.settings-button':
      'click': 'onSettings'
    '.logout-btn':
      'click': 'onLogout'

  render: ->

    super

    state = @viewmodel.state

    @$el.find('.nav-list-item.' + state).addClass('active')

  onSelect: (e) =>

    key = $(e.currentTarget).attr('data-key')

    if key
      @viewmodel.setState(key)
      @$el.find('.nav-list-item').removeClass('active')
      @$el.find('[data-key="' + key + '"]').addClass('active')

  onSettings: =>

    @viewmodel.setState('settings')

  onLogout: =>

    @viewmodel.logout()

module.exports = MenuView