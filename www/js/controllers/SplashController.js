app.controller('SplashController', ['$ionicHistory', '$localStorage', '$q', '$scope', '$state', 'apiService', function($ionicHistory, $localStorage, $q, $scope, $state, apiService){
	console.log('Splash Screen');

	$scope.stations = [];
	$scope.$storage = $localStorage;
    $scope.latestReadings = [];

	$ionicHistory.nextViewOptions({
	    disableBack: true
	});

	$scope.init = function(){
		console.log('init');

        var promises = [];

        promises.push(getAllLatestReadings());
        promises.push(getAllStations());

        $q.all(promises)
        .then(function(response) {
            console.log('fetch complete');
            $state.go('app.map');
        })
        .catch(function(error) {
            console.log('error', error);
        })
	};

    var getAllLatestReadings = function() {
        var deferred = $q.defer();
        var filteredLatestReadings = [];

        apiService.getAllLatestReadings()
        .then(function(latestReadings){
            latestReadings.forEach(function(latestReading) {
                if (latestReading.station.station_name != 'Naga City, Camarines Sur' &&
                latestReading.station.station_name != 'Pasay Station' &&
                latestReading.station.station_name != 'Navotas Station' &&
                latestReading.station.station_name != 'North Caloocan Station') {
                    // console.log('station', station);
                    filteredLatestReadings.push(latestReading);
                }
            });
            console.log('latest stations size', filteredLatestReadings.length);
            $scope.$storage.latestReadings = filteredLatestReadings;

            deferred.resolve();
        })
        .catch(function(error) {
            console.log('error in fetching latest readings', error);
        })

        return deferred.promise;
    }

    var getAllStations = function() {
        var deferred = $q.defer();
        var filteredStations = [];
        var newReadings = [];

        var promises = [];

        apiService.getAllStations()
        .then(function(stations) {
            stations.forEach(function(station) {
                if (station.station_name != 'Naga City, Camarines Sur' &&
                station.station_name != 'Pasay Station' &&
                station.station_name != 'Navotas Station' &&
                stations.station_name != 'North Caloocan Station') {
                    // console.log('station', station);
                    filteredStations.push(station);
                    promises.push(getNewReadings(station.id).then(function(readings) {
                        readings.forEach(function(reading) {
                            newReadings.push(reading);
                        })
                    }));
                } 
            });
            console.log('stations size', filteredStations.length);
            $scope.$storage.stations = filteredStations;

            // deferred.resolve();

            $q.all(promises)
            .then(function(response) {
                console.log('new readings size', newReadings.length);
                deferred.resolve();  
            })
            .catch(function(error) {
                deferred.reject(error);
            })
        })
        .catch(function(error) {
            console.log('error in fetching stations', error);
        })

        return deferred.promise;
    }

    var getNewReadings = function(stationId) {
        var deferred = $q.defer();

        apiService.getNewReadings(stationId)
        .then(function(readings) {
            console.log('readings size', readings.length)
            deferred.resolve(readings);
        })
        .catch(function(error) {
            deferred.reject(error);
            console.log('error in fetching reading', error);
        })

        return deferred.promise;
    }

	$scope.goToMain = function(){
		$state.go('app.map');

	};
}]);