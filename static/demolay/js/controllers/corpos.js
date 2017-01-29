angular.module("demolay").controller("Corpos", function($scope, $http, $timeout, $mdSidenav, $mdDialog){
  $scope.appTitle = "Corpos"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.grupos = Object.keys($scope.data.corpos);
});