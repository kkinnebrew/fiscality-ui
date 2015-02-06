angular.module('controllers.app', ['services']);

angular.module('controllers.app').controller('AppController', ['$scope', '$state', '$location', 'auth', function($scope, $state, $location, auth) {

  $scope.$state = $state;

  $scope.login = function (email, password) {
    auth.login(email, password).success(function (data, status) {
      console.log(data, status)
      $location.path('/app/accounts/banking');
    }).error(function (data, status) {
      console.error(data, status);
    });
  };

}]);