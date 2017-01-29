angular.module("demolay").controller("Contatos", function($scope, $http, $timeout, $mdSidenav, $mdDialog){
  $scope.appTitle = "Contatos"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.grupos = Object.keys($scope.data.contatos);

});