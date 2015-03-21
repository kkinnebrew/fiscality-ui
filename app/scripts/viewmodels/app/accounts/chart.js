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

    this.fire('prefresh');

    var that = this;

    if (this.accountId) {

      localStorage.setItem('accountId', this.accountId);

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

      setTimeout(function() {

        that.account = null;
        that.balance = null;

        ViewModel.prototype.refresh.call(that);

      }, 0);

    }

  }

});

module.exports = ChartViewModel;