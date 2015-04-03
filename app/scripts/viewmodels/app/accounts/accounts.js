var ViewModel = require('../../../common/viewmodel');
var transactionsAPI = require('../../../services/transactions.coffee');

var AccountsViewModel = ViewModel.extend({

  initialize: function() {

    this.accounts = [];
    this._super();

  },

  refresh: function() {

    this.fire('prefresh');

    var that = this;

    transactionsAPI.accounts().then(function(accounts) {

      that.accounts = accounts;

      ViewModel.prototype.refresh.call(that);

    }, function() {

      console.log('Error loading account');

      ViewModel.prototype.refresh.call(that);

    });


  }

});

module.exports = AccountsViewModel;