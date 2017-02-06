angular.module("demolay").controller("Eventos", function($scope, eventos){
  $scope.loaded();
  $scope.eventos = eventos.data;
  $scope.appTitle = "Eventos"
  $scope.icons = {
      menu: "reorder"
  }
});