var $ = require('jquery');

var baseUrl = 'http://fiscality-api.herokuapp.com';
//var baseUrl = 'http://localhost:9000';

module.exports = {

  transactions: function() {
    return $.ajax({
      type: 'GET',
      url: baseUrl + '/api/transactions',
      contentType: 'application/json;charset=UTF-8'
    });
  }

};