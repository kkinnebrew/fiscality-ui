var transactionsAPI = require('../../../services/transactions');
var ViewModel = require('../../../common/viewmodel');

var SubNavViewModel = ViewModel.extend({

  initialize: function() {

    var that = this;

    this.accounts = [];

    transactionsAPI.accounts().then(function(data) {
      console.log('accounts', data);
      that.accounts = data;
      that.fire('refresh');
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = SubNavViewModel;