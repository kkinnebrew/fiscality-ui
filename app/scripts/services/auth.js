angular.module('services.auth', []);

angular.module('services.auth').factory('auth', function($http, API_CONFIG) {

  var baseUrl = API_CONFIG.baseUrl + ':' + API_CONFIG.port;

  return {

    login: function(email, password) {
      return $http.post(baseUrl + '/api/login', {
        email: email,
        password: password
      });
    },

    register: function(firstName, lastName, email, password) {
      return $http.post(baseUrl + '/api/register', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
    },

    resetPassword: function(email) {
      return $http.post(baseUrl + '/api/forgot', {
        email: email,
      });
    }

  };

});