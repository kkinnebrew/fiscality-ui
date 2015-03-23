var $ = require('jquery');

function Service(config, cache) {
  this.config = config || {};
  this.cache = cache || null;
}

Service.prototype.headers = function(url) {
  return {};
};

Service.prototype.cacheGet = function(url, data) {
  return this.ajax('GET', url, data, true);
};

Service.prototype.get = function(url, data) {
  return this.ajax('GET', url, data);
};

Service.prototype.cachePost = function(url, data) {
  return this.ajax('POST', url, data, true);
};

Service.prototype.post = function(url, data) {
  return this.ajax('POST', url, data);
};

Service.prototype.ajax = function(method, url, data, cache) {

  var that = this;
  var deferred = $.Deferred();

  var cacheKey = method + ':' + url + ':' + JSON.stringify(data);

  if (cache && !this.cache) {
    console.error('No cache defined: ' + url);
    cache = false;
  }

  if (cache && this.cache.hasItem(cacheKey)) {
    setTimeout(function() {
      deferred.resolve(that.cache.getItem(cacheKey));
    }, 0);
    return deferred;
  }

  var requestUrl = (this.config.hasOwnProperty('baseUrl') ? this.config.baseUrl : '') + url;

  console.log('Request: ' + requestUrl, 'Headers: ' + JSON.stringify(this.headers(url)));

  $.ajax({
    type: method,
    url: requestUrl,
    data: data ? JSON.stringify(data) : {},
    contentType: (this.config.hasOwnProperty('contentType') ? this.config.contentType : 'application/json;charset=UTF-8'),
    headers: this.headers(url),
    success: function(result) {
      if (cache) {
        that.cache.setItem(cacheKey, result);
      }
      deferred.resolve(result);
    },
    error: function(xhr) {
      that.onError(requestUrl, xhr.status);
      deferred.reject();
    }
  });

  return deferred;

};

Service.prototype.onError = function(url, status) {
  console.error('Status ' + status + ': ' + url);
};

module.exports = Service;