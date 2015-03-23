var ViewModel = require('../common/viewmodel');
var auth = require('../services/auth.coffee');

var AppViewModel = ViewModel.extend({

  initialize: function() {

    this.name = 'AppViewModel';

    this._super();

  },

  logout: function() {

    auth.logout().then(function() {
      window.App.goto('home.login');
    }, function() {
      console.error('Error logging out');
      window.App.goto('home.login');
    })

  }

});

module.exports = AppViewModel;