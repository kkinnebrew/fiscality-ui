var $ = require('jquery');
var _ = require('underscore');

var baseUrl = require('./config').getBaseUrl();

window.cache = {
  transactions: {},
  balances: {},
  accounts: null
};

function getAuthToken() {

  var authToken = localStorage.getItem('authToken');

  if (!authToken) {
    window.cache = {
      transactions: {},
      balances: {},
      accounts: null
    };
    localStorage.removeItem('accountId');
    location.hash = '#/home/login';
  }

  return authToken;

}

function handleError(xhr) {

  if (xhr.status == 401) {
    window.cache = {
      transactions: {},
      balances: {},
      accounts: null
    };
    localStorage.removeItem('accountId');
    location.hash = '#/home/login';
  }

}

module.exports = {

  transactions: function (accountId) {

    var deferred = $.Deferred();

    if (!accountId) {
      deferred.reject();
      return deferred;
    }

    if (cache.transactions[accountId]) {
      setTimeout(function () {
        deferred.resolve(cache.transactions[accountId]);
      }, 0);
      return deferred;
    } else {
      $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts/' + accountId + '/transactions',
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function (data) {
          _.each(data, function(item) {
            item.accountNames = _.pluck(item.otherLines, 'accountName').join(', ');
          });
          cache.transactions[accountId] = data;
          deferred.resolve(data);
        },
        error: handleError
      });
      return deferred;
    }
  },

  //types: function() {
  //  return $.ajax({
  //    type: 'GET',
  //    url: baseUrl + '/api/transactions/types',
  //    contentType: 'application/json;charset=UTF-8'
  //  });
  //},

  accounts: function () {

    if (cache.accounts) {
      var deferred = $.Deferred();
      setTimeout(function () {
        deferred.resolve(cache.accounts);
      }, 0);
      return deferred;
    } else {
      return $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts',
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function (data) {
          cache.accounts = data;
        },
        error: handleError
      });
    }

  },

  account: function (accountId) {

    var deferred = $.Deferred();

    if (!accountId) {
      deferred.reject();
      return deferred;
    }

    if (cache.accounts) {
      var account = _.find(cache.accounts, function (account) {
        return account.accountId === accountId;
      });
      setTimeout(function () {
        deferred.resolve(account);
      }, 0);
      return deferred;
    } else {
      return $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts/' + accountId,
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        error: handleError
      });
    }

  },

  balance: function (accountId) {

    var deferred = $.Deferred();

    if (!accountId) {
      deferred.reject();
      return deferred;
    }

    if (cache.balances.hasOwnProperty(accountId)) {
      setTimeout(function () {
        deferred.resolve(cache.balances[accountId]);
      }, 0);
      return deferred;
    } else {
      return $.ajax({
        type: 'GET',
        url: baseUrl + '/api/accounts/' + accountId + '/balance',
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function (data) {
          cache.balances[accountId] = data;
        },
        error: handleError
      });
    }

  }

};