var $ = require('jquery');
var _ = require('underscore');

//var baseUrl = 'https://fiscality-api.herokuapp.com';
var baseUrl = 'http://localhost:9000';

var cache = {
  transactions: {},
  balances: {},
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

  },

  account: function(accountId) {
    if (cache.accounts) {
      var deferred = $.Deferred();
      //console.log('cache load');
      var account = _.find(cache.accounts, function(account) {
        return account.accountId === accountId;
      });
      deferred.resolve(account);
      return deferred;
    } else {
      return $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts/' + accountId,
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
          //console.log('ajax load');
          //cache.accounts = data;
        }
      });
    }

  },

  balance: function(accountId) {
    if (cache.balances.hasOwnProperty(accountId)) {
      var deferred = $.Deferred();
      //console.log('cache load');
      deferred.resolve(cache.balances[accountId]);
      return deferred;
    } else {
      return $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts/' + accountId + '/balance',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
          //console.log('ajax load', data);
          cache.balances[accountId] = data;
        }
      });
    }

  }

};