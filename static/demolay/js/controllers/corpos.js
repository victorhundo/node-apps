angular.module("demolay").controller("Corpos", function($scope, $window, dataAPI, config){

  if(dataAPI.get().length == 0)
    $window.location.href = config.path + '/'

  $scope.appTitle = "Corpos"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.grupos = Object.keys(dataAPI.get().corpos);
  $scope.corpos = {
  	"capitulos": [],
  	"priorados": [],
  	"castelos": [],
  	"cortes": [],
  }

  $scope.loadMore = function(array) {
	var count = $scope.corpos[array].length
    for(var i = 1; i <= 3; i++) {
      if(count < dataAPI.get().corpos[array].length)
	  	$scope.corpos[array].push(dataAPI.get().corpos[array][count++]);
    }
  };

});