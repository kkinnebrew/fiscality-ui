var transactionsAPI = require('../../../services/transactions');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var SubNavViewModel = ViewModel.extend({

  initialize: function(params) {

    var that = this;

    this.accounts = [];
    this.accountId = params.accountId || null;

    transactionsAPI.accounts().then(function(data) {
      that.accounts = data.reverse();
      that.refresh();
    }, function() {
      console.log('Error');
    });

  },

  refresh: function() {

    if (!this.accountId && this.accounts.length > 0) {
      window.App.goto('app.accounts', { accountId: this.accounts[0].accountId });
    }

    this._super();

  }

});

module.exports = SubNavViewModel;