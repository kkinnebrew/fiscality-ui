var transactionsAPI = require('../../../services/transactions');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var TransactionsViewModel = ViewModel.extend({

  initialize: function(params) {

    this.accountId = params.accountId || null;
    this.transactions = [];

    this._super();

  },

  refresh: function() {

    this.fire('prefresh');

    var that = this;

    if (this.accountId) {

      transactionsAPI.transactions(this.accountId).then(function (data) {

        var balance = 0;

        that.transactions = _.sortBy(data, 'transactionDate');
        that.transactions = _.map(that.transactions, function(item) {
          item.amount = item.debitAmount - item.creditAmount;
          item.balance = balance = balance + item.debitAmount - item.creditAmount;
          return item;
        });

        that.transactions.reverse();

        ViewModel.prototype.refresh.call(that);

      }, function () {
        console.log('Error');
      });

    } else {

      this.transactions = [];

      ViewModel.prototype.refresh.call(that);

    }

  }

});

module.exports = TransactionsViewModel;