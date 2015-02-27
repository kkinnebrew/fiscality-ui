var ViewModel = require('../../../common/clementine').ViewModel;
var transactions = require('../../../services/transactions');

var LedgerViewModel = ViewModel.extend({

  initialize: function() {

    var that = this;

    this.transactions = [];

    transactions.transactions().then(function(data) {
      that.transactions = data;
      console.log('refreshing');
      that.fire('refresh');
    }, function() {
      console.log('error');
    });

  }


});

module.exports = LedgerViewModel;
