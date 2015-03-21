var $ = require('jquery');

//var baseUrl = 'https://fiscality-api.herokuapp.com';
var baseUrl = 'http://localhost:9000';

function getAuthToken() {

  var authToken = localStorage.getItem('authToken');

  if (!authToken) {
    alert('unauthorized');
    location.hash = '#/home/login';
  }

  return authToken;

}

module.exports = {

  login: function(email, password) {
    return $.ajax({
      type: 'POST',
      url: baseUrl + '/api/login',
      data: JSON.stringify({
        email: email,
        password: password
      }),
      contentType: 'application/json;charset=UTF-8',
      success: function(user) {
        console.log('setting token: ', user.sessionId);
        localStorage.setItem('authToken', user.sessionId);
      }
    });
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
      success: function(user) {
        localStorage.removeItem('authToken');
        window.cache = {
          transactions: {},
          balances: {},
          accounts: null
        };
      }
    });
  }

};