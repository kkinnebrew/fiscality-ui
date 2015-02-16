
angular.module('controllers.app.advanced', ['services']);

angular.module('controllers.app.advanced').controller('LedgerController', ['$scope', '$state', 'transactions', function($scope, $state, transactions) {

  $scope.$state = $state;
  $scope.transactions = [];

  $scope.getTransactions = function() {
    transactions.all().success(function (data, status) {
      console.log(data, status);
      $scope.transactions = data;
    }).error(function (data, status) {
      console.error(data, status);
    });
  };

  $scope.getTransactions();

}]);