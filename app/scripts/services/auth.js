angular.module('services.auth', []);

angular.module('services.auth').factory('auth', function($http, API_CONFIG) {

  var baseUrl = API_CONFIG.baseUrl;

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

    forgotPassword: function(email) {
      return $http.post(baseUrl + '/api/forgotpassword', {
        email: email,
      });
    },

    resetPassword: function(password, confirm) {
      return $http.post(baseUrl + '/api/changepassword', {
        resetCode: 'abc',
        password: password,
        confirmPassword: confirm
      });
    }

  };

});