var transactionsAPI = require('../../../services/transactions');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var SubNavViewModel = ViewModel.extend({

  initialize: function() {

    var that = this;

    this.accounts = [];

    transactionsAPI.accounts().then(function(data) {
      that.accounts = data;
      that.fire('refresh');
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = SubNavViewModel;