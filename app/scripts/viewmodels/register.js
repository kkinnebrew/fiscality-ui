var ViewModel = require('../common/clementine').ViewModel;
var auth = require('../services/auth');

var RegisterViewModel = ViewModel.extend({

  register: function() {

    console.log('register in', this.firstName, this.lastName, this.email, this.password);

    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      return console.warn('Invalid form');
    }

    auth.register(this.firstName, this.lastName, this.email, this.password).then(function() {
      location.hash = '#/home/login'
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = RegisterViewModel;