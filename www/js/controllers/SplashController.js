app.controller('SplashController', ['$ionicHistory', '$localStorage', '$scope', '$state', 'apiService', function($ionicHistory, $localStorage, $scope, $state, apiService){
	console.log('Splash Screen');

	$scope.stations = [];
	$scope.$storage = $localStorage;

	$ionicHistory.nextViewOptions({
	    disableBack: true
	});

	$scope.init = function(){
		console.log('init');

		apiService.getAllLatestReadings()
        .then(function(stations){
            stations.forEach(function(station){
                if (station.station.station_name != 'Naga City, Camarines Sur' &&
                station.station.station_name != 'Pasay Station' &&
                station.station.station_name != 'Navotas Station' &&
                station.station.station_name != 'North Caloocan Station') {
                    // console.log('station', station);
                    $scope.stations.push(station);
                }
            });
            $scope.$storage.latestReadings = $scope.stations;
            $state.go('app.map');
        })
        .catch(function(error){
            console.log('error', error);
        });
	};

	$scope.goToMain = function(){
		$state.go('app.map');

	};
}]);