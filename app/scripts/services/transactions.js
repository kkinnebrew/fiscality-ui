var $ = require('jquery');

var baseUrl = 'https://fiscality-api.herokuapp.com';
//var baseUrl = 'http://localhost:9000';

module.exports = {

  transactions: function(accountId) {
    return $.ajax({
      type: 'GET',
      url: baseUrl + '/api/accounts/' + accountId + '/transactions',
      contentType: 'application/json;charset=UTF-8'
    });
  },

  //types: function() {
  //  return $.ajax({
  //    type: 'GET',
  //    url: baseUrl + '/api/transactions/types',
  //    contentType: 'application/json;charset=UTF-8'
  //  });
  //},

  accounts: function() {
    return $.ajax({
      type: 'GET',
      url: baseUrl + '/api/accounts',
      contentType: 'application/json;charset=UTF-8'
    });
  }

};