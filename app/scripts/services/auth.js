angular.module('services.auth', []);

angular.module('services.auth').factory('auth', function($http) {

  return {
    login: function(email, password) {
      console.log('GET http://localhost/api/login?email=' + email + '&=' + password);
    }
  };

});