var $ = require('jquery');

//var baseUrl = 'http://fiscality-api.herokuapp.com';
var baseUrl = 'http://localhost:9000';

module.exports = {

  login: function(email, password) {
    return $.ajax({
      type: 'POST',
      url: baseUrl + '/api/login',
      data: JSON.stringify({
        email: email,
        password: password
      }),
      contentType: 'application/json;charset=UTF-8'
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
  }

};