var ViewModel = require('../../common/viewmodel');
var auth = require('../../services/auth.coffee');

var ForgotViewModel = ViewModel.extend({

  forgotPassword: function(email) {

    console.log('forgot', email);

    if (!email) {
      return console.warn('Invalid email');
    }

    auth.forgotPassword(email).then(function() {
      window.App.goto('home.login');
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = ForgotViewModel;
