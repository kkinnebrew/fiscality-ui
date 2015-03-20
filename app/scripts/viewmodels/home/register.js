var ViewModel = require('../../common/viewmodel');
var auth = require('../../services/auth');

var RegisterViewModel = ViewModel.extend({

  register: function(firstName, lastName, email, password) {

    console.log('register in', firstName, lastName, email, password);

    if (!firstName || !lastName || !email || !password) {
      return console.warn('Invalid form');
    }

    auth.register(firstName, lastName, email, password).then(function() {
      window.App.goto('home.login');
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = RegisterViewModel;