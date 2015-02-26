var ViewModel = require('../../common/clementine').ViewModel;
var auth = require('../../services/auth');

var ResetViewModel = ViewModel.extend({

  resetPassword: function() {

    console.log('forgot', this.password, this.confirm);

    if (!this.password || !this.confirm || this.password !== this.confirm) {
      return console.warn('Invalid password');
    }

    auth.resetPassword(this.password, this.confirm).then(function() {
      location.hash = '#/home/login'
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = ResetViewModel;