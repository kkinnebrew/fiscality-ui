var $ = require('jquery');
var _ = require('underscore');

var baseUrl = require('./config').getBaseUrl();

function getAuthToken() {

  var authToken = cache.getPersistentItem('authToken');

  if (!authToken) {
    cache.purge();
    location.hash = '#/home/login';
  }

  return authToken;

}

function handleError(xhr) {

  if (xhr.status == 401) {
    cache.purge();
    location.hash = '#/home/login';
  }

}

module.exports = {

  portfolios: function () {

    var deferred = $.Deferred();

    if (cache.hasItem('portfolios')) {
      setTimeout(function () {
        deferred.resolve(cache.portfolios);
      }, 0);
      return deferred;
    } else {
      $.ajax({
        type: 'GET',
        url: baseUrl + '/api/portfolios',
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function (data) {
          cache.setItem('portfolios', data);
          deferred.resolve(data);
        },
        error: handleError
      });
      return deferred;
    }
  },

  positions: function (portfolioId) {

    var deferred = $.Deferred();

    if (false) {
      setTimeout(function () {
        deferred.resolve(cache.portfolios);
      }, 0);
      return deferred;
    } else {
      $.ajax({
        type: 'GET',
        url: baseUrl + '/api/portfolios/' + portfolioId + '/holdings',
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'X-Auth-Token': getAuthToken()
        },
        success: function (data) {
          deferred.resolve(data);
        },
        error: handleError
      });
      return deferred;
    }
  },

};