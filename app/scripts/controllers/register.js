angular.module('controllers.register', ['services']);

angular.module('controllers.register').controller('RegisterController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

  $scope.register = function(firstName, lastName, email, password) {
    auth.register(firstName, lastName, email, password).success(function(data, status) {
      console.log(data, status);
      $location.path('/app');
    }).error(function(data, status) {
      console.error(data, status);
    });
  };

}]);

angular.module('controllers.register').controller('ForgotController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

  $scope.resetPassword = function(email) {
    auth.resetPassword(email).success(function(data, status) {
      console.log(data, status);
      $location.path('/login');
    }).error(function(data, status) {
      console.error(data, status);
    });
  };

}]);