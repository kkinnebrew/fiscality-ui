var transactionsAPI = require('../../../services/transactions');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var SubNavViewModel = ViewModel.extend({

  initialize: function(params) {

    var that = this;

    this.accounts = [];
    this.accountId = params.accountId || null;

    this.fire('prefresh');

    transactionsAPI.accounts().then(function(data) {
      that.accounts = data.reverse();
      that.refresh();
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = SubNavViewModel;