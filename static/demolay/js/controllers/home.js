angular.module("demolay").controller("Home", function($scope, $window, config, dataAPI){
  if(dataAPI.get().length == 0)
    $window.location.href = config.path + '/'

  $scope.noticias = [];
  $scope.appTitle = "Home"
  $scope.icons = {
      menu: "reorder"
  }

  var count = 0;
  $scope.loadMore = function() {
    for(var i = 1; i <= 3; i++) {
      if(count < dataAPI.get().noticias.length)
        $scope.noticias.push(dataAPI.get().noticias[count++]);
    }
  };

});