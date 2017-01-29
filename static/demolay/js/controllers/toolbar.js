angular.module("demolay").controller("Toolbar", function($scope, $timeout, $mdSidenav, $log){
    $scope.toggleRight = buildToggler('left');
    $scope.isOpenRight = function(){
      return $mdSidenav('left').isOpen();
    };

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID).toggle()
      }
    }

    $scope.closeToolbar = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
    };
});