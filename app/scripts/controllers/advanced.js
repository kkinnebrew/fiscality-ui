angular.module('app').config(['$stateProvider', function($stateProvider) {

  $stateProvider
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
      templateUrl: 'partials/app/advanced/ledger.html',
      controller: 'LedgerController'
    });

}]);

angular.module('controllers.app.advanced', ['services']);

angular.module('controllers.app.advanced').controller('LedgerController', ['$scope', '$state', 'transactions', function($scope, $state, transactions) {

  $scope.$state = $state;
  $scope.transactions = {};

  $scope.getTransactions = function() {
    transactions.all().success(function (data, status) {
      $scope.transactions = {};
      for (var i in data) {
        $scope.transactions[data[i].transactionId] = data[i];
      }
    }).error(function (data, status) {
      console.error(data, status);
    });
  };

  $scope.sortColumn = '-debitAmount';

  $scope.getTransactions();

  $scope.toggleEdit = function(transactionId) {
    if ($scope.transactions.hasOwnProperty(transactionId)) {
      $scope.transactions[transactionId].editable = !$scope.transactions[transactionId].editable;
    }
  };

  $scope.$watch('transactions', function() {
    console.log('something changed', arguments);
  }, true);

  $scope.$watchCollection('transactions', function() {
    console.log('something in the college changed', arguments);
  }, true);

}]);

angular.module('controllers.app.advanced').filter('date', function() {

  return function(input) {
    return Date.parse(input).toString('MMMM d, yyyy');
  };

});

angular.module('controllers.app.advanced').filter('currency', function() {

  return function(input) {
    if (isNaN(input) || parseFloat(input) === 0) {
      return '-';
    } else {
      return parseFloat(input).toFixed(2);
    }
  };

});