var ViewModel = require('../common/clementine').ViewModel;

var AppViewModel = ViewModel.extend({

  initialize: function() {

    this._super.apply(this, arguments);

    var route = location.hash;
    var parts = route.split('/');

    if (parts.length > 2) {
      this.state = parts[2];
    } else {
      this.state = null;
    }

    this.isAccounts = this.state === 'accounts';
    this.isInvestments = this.state === 'investments';
    this.isSpending = this.state === 'spending';
    this.isTaxes = this.state === 'taxes';
    this.isAdvanced = this.state === 'advanced';

  }

});

module.exports = AppViewModel;