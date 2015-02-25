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

angular.module('app').constant('API_CONFIG', {
  baseUrl: 'http://localhost:9000'
  //baseUrl: 'https://fiscality-api.herokuapp.com'
});

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home/login');

  $stateProvider
    .state('home', {
      abstract: true,
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('home.login', {
      url: '/login',
      templateUrl: 'templates/home/login.html',
      controller: 'LoginController'
    })
    .state('home.register', {
      url: '/register',
      templateUrl: 'templates/home/register.html',
      controller: 'RegisterController'
    })
    .state('home.forgot', {
      abstract: true,
      url: '/forgot',
      templateUrl: 'templates/home/forgot.html',
      controller: 'ForgotController'
    })
    .state('home.forgot.form', {
      url: '/form',
      templateUrl: 'templates/home/forgot.form.html',
      controller: 'ForgotController'
    })
    .state('home.forgot.success', {
      url: '/success',
      templateUrl: 'templates/home/forgot.success.html'
    })
    .state('home.forgot.error', {
      url: '/error',
      templateUrl: 'templates/home/forgot.error.html'
    })
    .state('home.reset', {
      abstract: true,
      url: '/reset',
      templateUrl: 'templates/home/reset.html'
    })
    .state('home.reset.form', {
      url: '/form',
      templateUrl: 'templates/home/reset.form.html',
      controller: 'ResetController'
    })
    .state('home.reset.success', {
      url: '/form',
      templateUrl: 'templates/home/reset.success.html'
    })
    .state('home.reset.error', {
      url: '/form',
      templateUrl: 'templates/home/reset.error.html'
    });

}]);