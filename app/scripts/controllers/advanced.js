
angular.module('controllers.app.advanced', ['services']);

angular.module('controllers.app.advanced').controller('LedgerController', ['$scope', '$state', 'transactions', function($scope, $state, transactions) {

  $scope.$state = $state;
  $scope.transactions = [];

  $scope.getTransactions = function() {
    transactions.all().success(function (data, status) {
      $scope.transactions = data;
    }).error(function (data, status) {
      console.error(data, status);
    });
  };

  $scope.sortColumn = '-debitAmount';

  $scope.getTransactions();

}]);

angular.module('controllers.app.advanced').filter('date', function() {

  return function(input) {
    return Date.parse(input).toString('MMMM d, yyyy');
  };

});

angular.module('controllers.app.advanced').filter('currency', function() {

  return function(input) {
    if (isNaN(input) || parseInt(input) === 0) {
      return '-';
    } else {
      return parseInt(input).toFixed(2);
    }
  };

});