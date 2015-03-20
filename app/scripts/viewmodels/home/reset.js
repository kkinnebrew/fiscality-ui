var ViewModel = require('../../common/viewmodel');
var auth = require('../../services/auth');

var ResetViewModel = ViewModel.extend({

  resetPassword: function(password, confirm) {

    console.log('forgot', password, confirm);

    if (!password || !confirm || password !== confirm) {
      return console.warn('Invalid password');
    }

    auth.resetPassword(password, confirm).then(function() {
      window.App.goto('home.login');
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = ResetViewModel;