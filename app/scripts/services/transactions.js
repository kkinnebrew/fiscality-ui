angular.module('services.transactions', []);

angular.module('services.transactions').factory('transactions', function($http, API_CONFIG) {

  var baseUrl = API_CONFIG.baseUrl;

  return {

    all: function() {
      return $http.get(baseUrl + '/api/transactions', {});
    }

  };

});