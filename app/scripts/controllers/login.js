angular.module('controllers.login', ['services']);

angular.module('controllers.login').controller('LoginController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

  $scope.message = 'Error logging into account!';

  $scope.login = function(email, password) {
    auth.login(email, password).success(function(data, status) {
      console.log(data, status)
      $location.path('/app');
    }).error(function(data, status) {
      console.error(data, status);
    });
  };

}]);