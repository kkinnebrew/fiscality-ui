var ViewModel = require('../../common/clementine').ViewModel;

var LedgerViewModel = ViewModel.extend({

  initialize: function() {

    this.transactions = [{
      transactionDate: '2014-10-01',
      description: 'Bought a car',
      debitAmount: 1409.33,
      creditAmount: 0
    }, {
      transactionDate: '2014-10-01',
      description: 'Bought a car',
      debitAmount: 1409.33,
      creditAmount: 0
    }, {
      transactionDate: '2014-10-01',
      description: 'Bought a car',
      debitAmount: 0,
      creditAmount: 500.61
    }, {
      transactionDate: '2014-10-01',
      description: 'Bought a car',
      debitAmount: 0,
      creditAmount: 690.12
    }];

  }

});

module.exports = LedgerViewModel;
