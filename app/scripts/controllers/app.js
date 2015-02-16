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

angular.module('controllers.app', ['services']);

angular.module('controllers.app').controller('AppController', ['$scope', '$state', '$location', 'auth', function($scope, $state, $location, auth) {

  $scope.$state = $state;

  $scope.login = function (email, password) {
    auth.login(email, password).success(function (data, status) {
      console.log(data, status);
      $location.path('/app/accounts/banking');
    }).error(function (data, status) {
      console.error(data, status);
    });
  };

}]);