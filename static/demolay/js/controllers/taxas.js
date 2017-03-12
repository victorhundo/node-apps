angular.module("demolay").controller("Taxas", function($scope, $window, config, dataAPI){
  if(dataAPI.get().length == 0)
    $window.location.href = config.path + '/'

  $scope.taxas = dataAPI.get().taxas;
  $scope.appTitle = "Taxas"
  $scope.icons = {
      menu: "reorder"
  }
});