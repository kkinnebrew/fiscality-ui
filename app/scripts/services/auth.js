var $ = require('jquery');

var baseUrl = 'https://fiscality-api.herokuapp.com';

module.exports = {

  login: function(email, password) {
    return $.ajax({
      type: 'POST',
      url: baseUrl + '/api/login',
      data: {
        email: email,
        password: password
      }
    });
  }

};