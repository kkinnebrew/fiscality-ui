var transactionsAPI = require('../../../services/transactions');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var TransactionsViewModel = ViewModel.extend({

  initialize: function(params) {

    this.oldAccountId = -1;

    this.accountId = params.accountId || null;

    this.transactions = [];

    this._super();

  },

  refresh: function() {

    var that = this;

    if (this.accountId && this.oldAccountId !== this.accountId) {
      this.oldAccountId = this.accountId;
      transactionsAPI.transactions(this.accountId).then(function (data) {
        var balance = 0;
        that.transactions = _.sortBy(data, 'transactionDate');
        that.transactions = _.map(that.transactions, function(item) {
          item.amount = item.debitAmount - item.creditAmount;
          item.balance = balance = balance + item.debitAmount - item.creditAmount;
          return item;
        });
        that.transactions.reverse();
        that.refresh();
      }, function () {
        console.log('Error');
      });
    } else {
      this.fire('refresh');
    }

  }

});

module.exports = TransactionsViewModel;