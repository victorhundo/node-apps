angular.module("demolay").controller("Taxas", function($scope, taxas){
  $scope.loaded();
  $scope.taxas = taxas.data;
  $scope.appTitle = "Taxas"
  $scope.icons = {
      menu: "reorder"
  }
});