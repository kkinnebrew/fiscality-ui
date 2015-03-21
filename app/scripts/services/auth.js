var $ = require('jquery');
var transactionsAPI = require('./transactions');

var baseUrl = require('./config').getBaseUrl();

function getAuthToken() {

  var authToken = localStorage.getItem('authToken');

  if (!authToken) {
    localStorage.removeItem('accountId');
    window.cache = {
      transactions: {},
      balances: {},
      accounts: null
    };
    location.hash = '#/home/login';
  }

  return authToken;

}

module.exports = {

  login: function(email, password) {
    var deferred = $.Deferred();
    $.ajax({
      type: 'POST',
      url: baseUrl + '/api/login',
      data: JSON.stringify({
        email: email,
        password: password
      }),
      contentType: 'application/json;charset=UTF-8',
      success: function(user) {
        localStorage.setItem('authToken', user.sessionId);
        transactionsAPI.accounts().then(function(data) {
          data.reverse();
          if (data && data.length > 0) {
            localStorage.setItem('accountId', data[0].accountId);
          }
          deferred.resolve(user);
        }, function() {
          deferred.reject();
        });

      },
      error: function() {
        deferred.reject();
      }
    });
    return deferred;
  },

  register: function(firstName, lastName, email, password) {
    return $.ajax({
      type: 'POST',
      url: baseUrl + '/api/register',
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }),
      contentType: 'application/json;charset=UTF-8'
    });
  },

  forgotPassword: function(email) {
    return $.ajax({
      type: 'POST',
      url: baseUrl + '/api/forgotpassword',
      data: JSON.stringify({
        email: email
      }),
      contentType: 'application/json;charset=UTF-8'
    });
  },

  resetPassword: function(password, confirm) {
    return $.ajax({
      type: 'POST',
      url: baseUrl + '/api/changepassword',
      data: JSON.stringify({
        resetCode: '',
        password: password,
        confirm: confirm
      }),
      contentType: 'application/json;charset=UTF-8'
    });
  },

  logout: function() {
    return $.ajax({
      type: 'GET',
      url: baseUrl + '/api/logout',
      headers: {
        'X-Auth-Token': getAuthToken()
      },
      contentType: 'application/json;charset=UTF-8',
      success: function() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('accountId');
        window.cache = {
          transactions: {},
          balances: {},
          accounts: null
        };
      }
    });
  }

};