angular.module("demolay").controller("Eventos", function($scope, $window, config, dataAPI){
  if(dataAPI.get().length == 0)
    $window.location.href = config.path + '/'

  $scope.eventos = [];
  $scope.appTitle = "Eventos"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.loadMore = function() {
	var count = $scope.eventos.length
    for(var i = 1; i <= 4; i++) {
      if(count < dataAPI.get().eventos.length)
	  	$scope.eventos.push(dataAPI.get().eventos[count++]);
    }
  };
});