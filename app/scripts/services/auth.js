var $ = require('jquery');

var baseUrl = 'http://fiscality-api.herokuapp.com';

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
  }

};