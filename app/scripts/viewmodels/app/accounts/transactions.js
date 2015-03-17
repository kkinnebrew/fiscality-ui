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
      //console.log('getting transactions for ', this.accountId);
      transactionsAPI.transactions(this.accountId).then(function (data) {
        that.transactions = data;
        //console.log(data.length);
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