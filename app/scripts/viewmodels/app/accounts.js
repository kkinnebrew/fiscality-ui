var ViewModel = require('../../common/clementine').ViewModel;

var AccountsViewModel = ViewModel.extend({

  initialize: function() {

    this._super.apply(this, arguments);

    var route = location.hash;
    var parts = route.split('/');

    if (parts.length > 3) {
      this.state = parts[3];
    } else {
      this.state = null;
    }

    this.isBanking = this.state === 'banking';
    this.isCredit = this.state === 'credit';

  }

});

module.exports = AccountsViewModel;