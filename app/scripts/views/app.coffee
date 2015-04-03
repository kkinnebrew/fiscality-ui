View = require('../common/view')
$ = require('jquery')

class AppView extends View

  renderSubview: () ->

    @$el.find('.nav-list-item.active').removeClass('active')

    if location.hash.indexOf('account') != -1
      @$el.find('.nav-list-item.accounts').addClass('active');
    else if location.hash.indexOf('investments' != -1)
      @$el.find('.nav-list-item.investments').addClass('active');

    super

module.exports = AppView