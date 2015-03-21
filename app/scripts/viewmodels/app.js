var ViewModel = require('../common/viewmodel');
var auth = require('../services/auth');

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
    })

  }

});

module.exports = AppViewModel;