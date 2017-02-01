angular.module("demolay").controller("Cache", function($scope, $http){
  $scope.caches = []

  $scope.caches.push("#noticias")
  for (i in $scope.data.noticias){
  	$scope.caches.push($scope.data.noticias[i].imgext);
  }

});