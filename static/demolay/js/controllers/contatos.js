angular.module("demolay").controller("Contatos", function($scope, contatos){
  $scope.loaded();
  $scope.cpntatos = contatos.data;
  $scope.appTitle = "Contatos"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.grupos = Object.keys($scope.cpntatos);

});