var transactionsAPI = require('../../../services/transactions');

var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var ChartViewModel = ViewModel.extend({

  initialize: function(params) {

    this.accountId = params.accountId || 'null';

    var that = this;

    transactionsAPI.accounts().then(function(data) {

      if (data.length) {
        that.setValue('accountId', data[0].accountId);
      }

    }, function() {
      console.log('Error');
    });
  }

});

module.exports = ChartViewModel;