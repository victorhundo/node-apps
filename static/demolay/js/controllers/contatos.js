angular.module("demolay").controller("Contatos", function($scope, $window, config, dataAPI){
  if(dataAPI.get().length == 0)
    $window.location.href = config.path + '/'

  $scope.appTitle = "Contatos"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.contatos = dataAPI.get().contatos;
  $scope.grupos = Object.keys($scope.contatos);

});