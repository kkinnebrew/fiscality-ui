angular.module('controllers.login', ['services']);

angular.module('controllers.login').controller('LoginController', ['$scope', 'auth', function($scope, auth) {
  $scope.message = 'Error logging into account!';
  auth.login('kevin.kinnebrew@gmail.com', 'admin');
}]);