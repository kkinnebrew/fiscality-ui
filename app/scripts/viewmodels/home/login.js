var ViewModel = require('../../common/viewmodel');
var auth = require('../../services/auth');

var LoginViewModel = ViewModel.extend({

  login: function() {

    console.log('logging in', this.email, this.password);

    if (!this.email || !this.password) {
      return console.warn('Invalid credentials');
    }

    auth.login(this.email, this.password).then(function() {
      location.hash = '#/app'
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = LoginViewModel;