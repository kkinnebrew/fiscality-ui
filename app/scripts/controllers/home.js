angular.module('controllers.home', ['services']);

angular.module('controllers.home').controller('LoginController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

  $scope.login = function(email, password) {
    auth.login(email, password).success(function(data, status) {
      console.log(data, status)
      $location.path('/app');
    }).error(function(data, status) {
      console.error(data, status);
    });
  };

}]);

angular.module('controllers.home').controller('RegisterController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

  $scope.register = function(firstName, lastName, email, password) {
    auth.register(firstName, lastName, email, password).success(function(data, status) {
      console.log(data, status);
      $location.path('/app');
    }).error(function(data, status) {
      console.error(data, status);
    });
  };

}]);

angular.module('controllers.home').controller('ForgotController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

  $scope.resetPassword = function(email) {
    auth.resetPassword(email).success(function(data, status) {
      console.log(data, status);
      console.log('123');
      $location.path('/home/forgot/success');
    }).error(function(data, status) {
      $location.path('/home/forgot/error');
    });
  };

}]);