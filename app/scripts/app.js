/**
 * @file app.js
 * @author kkinnebrew
 * @date 2.1.2015
 */

angular.module('app', [
  'ui.router',
  'util.version'
]);

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html'
    })
    .state('login.error', {
      url: '/error',
      templateUrl: 'partials/login.error.html',
      controller: function($scope) {
        $scope.message = 'Error logging into account';
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'partials/register.html'
    });

});

angular.module('app').controller('AppController', ['$scope', function($scope) {
  $scope.version = '0.1.0';
}]);