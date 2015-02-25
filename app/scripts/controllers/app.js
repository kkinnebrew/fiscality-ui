angular.module('app').config(['$stateProvider', function($stateProvider) {

  $stateProvider
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
    });

}]);

angular.module('controllers.app', ['services']);
