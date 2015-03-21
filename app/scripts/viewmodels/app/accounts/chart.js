var transactionsAPI = require('../../../services/transactions');

var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var ChartViewModel = ViewModel.extend({

  initialize: function(params) {

    this.accountId = params.accountId || null;
    this.account = null;
    this.balance = null;

    this._super();

  },

  refresh: function() {

    var that = this;

    if (this.accountId) {

      transactionsAPI.account(this.accountId).then(function(account) {

        transactionsAPI.balance(that.accountId).then(function(balance) {

          that.account = account;
          that.balance = balance || 0;

          ViewModel.prototype.refresh.call(that);

        }, function() {
          console.log('Error');
        });

      }, function () {
        console.log('Error');
      });

    } else {

      this.account = null;
      this.balance = null;

      ViewModel.prototype.refresh.call(this);

    }

  }

});

module.exports = ChartViewModel;