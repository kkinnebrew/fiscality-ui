
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