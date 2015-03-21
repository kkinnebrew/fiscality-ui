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

    if (this.accountId && this.oldAccountId !== this.accountId) {
      this.oldAccountId = this.accountId;
      transactionsAPI.account(that.accountId).then(function(account) {
        transactionsAPI.balance(that.accountId).then(function(balance) {
          if (account) {
            that.setValues({
              account: account,
              balance: balance || 0
            });
          }
        }, function() {
          console.log('Error');
        });

      }, function () {
        console.log('Error');
      });
    } else {
      this.fire('refresh');
    }

  }

});

module.exports = ChartViewModel;