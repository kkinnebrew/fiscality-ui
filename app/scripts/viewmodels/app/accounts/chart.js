var $ = require('jquery');
var _ = require('underscore');

var transactionsAPI = require('../../../services/transactions.coffee');
var ViewModel = require('../../../common/viewmodel');
var cache = require('../../../common/cache');

var ChartViewModel = ViewModel.extend({

  initialize: function(params) {

    this.accountId = params.accountId || null;
    this.account = null;
    this.accounts = [];
    this.balance = null;

    this._super();

  },

  refresh: function() {

    this.fire('prefresh');

    var that = this;

    if (this.accountId) {

      var accountsRequest = transactionsAPI.accounts();
      var accountRequest = transactionsAPI.account(this.accountId);
      var balanceRequest = transactionsAPI.balance(this.accountId);

      $.when(accountsRequest, accountRequest, balanceRequest).then(function(accounts, account, balance) {

        cache.setPersistentItem('accountId', that.accountId);

        that.accounts = accounts;
        that.account = account;
        that.balance = balance || 0;

        ViewModel.prototype.refresh.call(that);

      }, function() {

        console.log('Error loading account');

        ViewModel.prototype.refresh.call(that);

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