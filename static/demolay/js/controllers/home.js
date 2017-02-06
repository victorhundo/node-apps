angular.module("demolay").controller("Home", function($scope, demolayData){
  $scope.loaded();
  $scope.noticias = demolayData.data;
  $scope.appTitle = "Home"
  $scope.icons = {
      menu: "reorder"
  }
});