var ViewModel = require('../../common/viewmodel');
var auth = require('../../services/auth.coffee');

var LoginViewModel = ViewModel.extend({

  login: function(email, password) {

    if (!email || !password) {
      return console.warn('Invalid credentials');
    }

    auth.login(email, password).then(function() {
      location.hash = '#/app'
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = LoginViewModel;