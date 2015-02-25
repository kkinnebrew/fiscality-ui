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
  }

};