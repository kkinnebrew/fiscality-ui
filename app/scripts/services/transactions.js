var $ = require('jquery');

//var baseUrl = 'https://fiscality-api.herokuapp.com';
var baseUrl = 'http://localhost:9000';

var cache = {
  transactions: {},
  accounts: null
};

module.exports = {

  transactions: function(accountId) {
    if (cache.transactions[accountId]) {
      var deferred = $.Deferred();
      //console.log('cache load');
      deferred.resolve(cache.transactions[accountId]);
      return deferred;
    } else {
      return $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts/' + accountId + '/transactions',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
          //console.log('ajax load');
          cache.transactions[accountId] = data;
        }
      });
    }
  },

  //types: function() {
  //  return $.ajax({
  //    type: 'GET',
  //    url: baseUrl + '/api/transactions/types',
  //    contentType: 'application/json;charset=UTF-8'
  //  });
  //},

  accounts: function() {
    if (cache.accounts) {
      var deferred = $.Deferred();
      //console.log('cache load');
      deferred.resolve(cache.accounts);
      return deferred;
    } else {
      return $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
          //console.log('ajax load');
          cache.accounts = data;
        }
      });
    }

  }

};