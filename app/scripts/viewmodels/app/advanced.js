var ViewModel = require('../../common/clementine').ViewModel;

var AdvancedViewModel = ViewModel.extend({

  initialize: function() {

    this._super.apply(this, arguments);

    var route = location.hash;
    var parts = route.split('/');

    if (parts.length > 3) {
      this.state = parts[3];
    } else {
      this.state = null;
    }

    this.isLedger = this.state === 'ledger';
    this.isBalance = this.state === 'balance';
    this.isIncome = this.state === 'income';
    this.isCash = this.state === 'cash';

  }

});

module.exports = AdvancedViewModel;