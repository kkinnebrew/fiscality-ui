angular.module('services.auth', []);

angular.module('services.auth').factory('auth', function($http, API_CONFIG) {

  return {
    login: function(email, password) {
      console.log('GET ' + API_CONFIG.baseUrl + ':' + API_CONFIG.port + '/api/login?email=' + email + '&=' + password);
    }
  };

});