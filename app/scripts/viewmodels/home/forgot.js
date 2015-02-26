var ViewModel = require('../../common/clementine').ViewModel;
var auth = require('../../services/auth');

var ForgotViewModel = ViewModel.extend({

  forgotPassword: function() {

    console.log('forgot', this.email);

    if (!this.email) {
      return console.warn('Invalid email');
    }

    auth.forgotPassword(this.email).then(function() {
      location.hash = '#/home/login'
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = ForgotViewModel;
