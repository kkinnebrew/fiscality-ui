var $ = require('jquery');

var baseUrl = 'http://localhost:9000';

module.exports = {

  login: function(email, password) {
    return $.ajax({
      type: 'POST',
      url: baseUrl + '/api/login',
      data: {
        email: email,
        password: password
      },
      contentType: 'application/json;charset=UTF-8',
      dataType: 'json'
    });
  }

};