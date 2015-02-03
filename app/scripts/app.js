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
  port: '9000'
});

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home/login');

  $stateProvider
    .state('home', {
      abstract: true,
      url: '/home',
      templateUrl: 'partials/home.html'
    })
    .state('home.login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'LoginController',
      onEnter: function() {
        console.log('enter', arguments);
      },
      onExit: function() {
        console.log('exit');
      }
    })
    .state('home.login.error', {
      url: '/error',
      templateUrl: 'partials/login.error.html',
      controller: 'LoginController'
    })
    .state('home.register', {
      url: '/register',
      templateUrl: 'partials/register.html',
      controller: 'RegisterController'
    })
    .state('app', {
      url: '/app',
      templateUrl: 'partials/app.html'
    });

}]);