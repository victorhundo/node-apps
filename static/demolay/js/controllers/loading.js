angular.module("demolay").controller("Loading", function($scope, $window, demolayData, config){
	$window.location.href = config.path + '/home'
});