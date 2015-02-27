var ViewModel = require('../../../common/clementine').ViewModel;
var transactions = require('../../../services/transactions');
var $ = require('jquery');

var LedgerViewModel = ViewModel.extend({

  initialize: function() {

    var that = this;

    this.transactions = [];
    //this.transactionTypes = [];
    this.accounts = [];

    this.hasEditor = false;

    var transactionsRequest = transactions.transactions().then(function(data) {
      that.transactions = data;
    }, function() {
      console.log('error');
    });

    //var typesRequest = transactions.types().then(function(data) {
    //  that.transactionTypes = data;
    //}, function() {
    //  console.log('error');
    //});

    var accountsRequest = transactions.accounts().then(function(data) {
      that.accounts = data;
    }, function() {
      console.log('error');
    });

    $.when(transactionsRequest, accountsRequest).then(function() {
      console.log('refreshing');
      that.fire('refresh');
    }, function() {
      console.error('Error fetching data');
    })

  },

  addTransaction: function() {

    console.log('123');

    this.hasEditor = !this.hasEditor;

    this.fire('refresh');

  },

  saveTransaction: function() {

    console.log('123');

    this.hasEditor = false;

    this.fire('refresh');

  }


});

module.exports = LedgerViewModel;
