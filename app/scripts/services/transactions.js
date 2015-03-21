var $ = require('jquery');
var _ = require('underscore');

var baseUrl = 'https://fiscality-api.herokuapp.com';
//var baseUrl = 'http://localhost:9000';

var cache = {
  transactions: {},
  balances: {},
  accounts: null
};

function getAuthToken() {

  var authToken = localStorage.getItem('authToken');

  if (!authToken) {
    alert('unauthorized');
    location.hash = '#/home/login';
  }

  return authToken;

}

function handleError(xhr) {

  if (xhr.status == 401) {
    alert('unauthorized');
    location.hash = '#/home/login';
  }

}

module.exports = {

  transactions: function(accountId) {

    if (!accountId) {
      var deferred = $.Deferred();
      deferred.reject();
      return deferred;
    }

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
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function(data) {
          //console.log('ajax load');
          cache.transactions[accountId] = data;
        },
        error: handleError
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
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function(data) {
          //console.log('ajax load');
          cache.accounts = data;
        },
        error: handleError
      });
    }

  },

  account: function(accountId) {
    if (!accountId) {
      var deferred = $.Deferred();
      deferred.reject();
      return deferred;
    }

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
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function(data) {
          //console.log('ajax load');
          //cache.accounts = data;
        },
        error: handleError
      });
    }

  },

  balance: function(accountId) {
    if (!accountId) {
      var deferred = $.Deferred();
      deferred.reject();
      return deferred;
    }

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
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function(data) {
          //console.log('ajax load', data);
          cache.balances[accountId] = data;
        },
        error: handleError
      });
    }

  }

};