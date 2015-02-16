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
  baseUrl: 'https://fiscality-api.herokuapp.com'
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
      templateUrl: 'partials/home/login.html',
      controller: 'LoginController'
    })
    .state('home.register', {
      url: '/register',
      templateUrl: 'partials/home/register.html',
      controller: 'RegisterController'
    })
    .state('home.forgot', {
      abstract: true,
      url: '/forgot',
      templateUrl: 'partials/home/forgot.html',
      controller: 'ForgotController'
    })
    .state('home.forgot.form', {
      url: '/form',
      templateUrl: 'partials/home/forgot.form.html',
      controller: 'ForgotController'
    })
    .state('home.forgot.success', {
      url: '/success',
      templateUrl: 'partials/home/forgot.success.html'
    })
    .state('home.forgot.error', {
      url: '/error',
      templateUrl: 'partials/home/forgot.error.html'
    })
    .state('home.reset', {
      abstract: true,
      url: '/reset',
      templateUrl: 'partials/home/reset.html'
    })
    .state('home.reset.form', {
      url: '/form',
      templateUrl: 'partials/home/reset.form.html',
      controller: 'ResetController'
    })
    .state('home.reset.success', {
      url: '/form',
      templateUrl: 'partials/home/reset.success.html'
    })
    .state('home.reset.error', {
      url: '/form',
      templateUrl: 'partials/home/reset.error.html'
    })
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'partials/app.html',
      controller: 'AppController'
    })
    .state('app.accounts', {
      abstract: true,
      url: '/accounts',
      templateUrl: 'partials/app/accounts.html'
    })
    .state('app.accounts.banking', {
      url: '/banking',
      templateUrl: 'partials/app/accounts/banking.html'
    })
    .state('app.accounts.credit', {
      url: '/credit',
      templateUrl: 'partials/app/accounts/credit.html'
    })
    .state('app.investments', {
      abstract: true,
      url: '/investments',
      templateUrl: 'partials/app/investments.html'
    })
    .state('app.investments.positions', {
      url: '/positions',
      templateUrl: 'partials/app/investments/positions.html'
    })
    .state('app.investments.activity', {
      url: '/activity',
      templateUrl: 'partials/app/investments/activity.html'
    })
    .state('app.advanced', {
      abstract: true,
      url: '/investments',
      templateUrl: 'partials/app/advanced.html'
    })
    .state('app.advanced.balance', {
      url: '/balance',
      templateUrl: 'partials/app/advanced/balance.html'
    })
    .state('app.advanced.ledger', {
      url: '/ledger',
      templateUrl: 'partials/app/advanced/ledger.html'
    });

}]);