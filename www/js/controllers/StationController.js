app.controller('StationController', ['$scope', '$stateParams', function($scope, $stateParams){
	console.log('Station Controller');

	$scope.init = function() {
		console.log($stateParams.station_id);
	}
}]);