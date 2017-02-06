angular.module("demolay").controller("Corpos", function($scope, corpos){
  $scope.loaded();
  $scope.corpos = corpos.data;
  $scope.appTitle = "Corpos"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.grupos = Object.keys($scope.corpos);
  $scope.satanas = $scope.corpos['capitulos'].splice(1,5);
});