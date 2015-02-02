/**
 * @file app.js
 * @author kkinnebrew
 * @date 2.1.2015
 */

angular.module('app', [
  'ui.router',
  'util.version',
  'services',
  'controllers'
]);

//angular.module('app').run(['api', function(api) {
//  api.test('Hi');
//}]);

angular.module('app').constant('API_CONFIG', {
  baseUrl: 'http://localhost',
  port: '8000'
});

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html'
    })
    .state('login.error', {
      url: '/error',
      templateUrl: 'partials/login.error.html',
      controller: 'LoginController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'partials/register.html'
    });

}]);