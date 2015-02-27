var ViewModel = require('../../../common/clementine').ViewModel;
var transactions = require('../../../services/transactions');

var LedgerViewModel = ViewModel.extend({

  initialize: function() {

    var that = this;

    this.transactions = [];
    this.hasEditor = false;

    transactions.transactions().then(function(data) {
      that.transactions = data;
      console.log('refreshing');
      that.fire('refresh');
    }, function() {
      console.log('error');
    });

  },

  addTransaction: function() {

    console.log('123');

    this.hasEditor = !this.hasEditor;

    this.fire('refresh');

  },

  saveTransaction: function() {

    console.log('123');

    this.hasEditor = false;

    this.fire('refresh');

  }


});

module.exports = LedgerViewModel;
