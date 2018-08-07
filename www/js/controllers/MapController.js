app.controller('MapController', ['$q', '$scope', '$localStorage', '$state', 'apiService', 'NgMap', function($q, $scope, $localStorage, $state, apiService, NgMap){

	var infobox = {};
	$scope.map;
	$scope.station;
	$scope.$storage = $localStorage;
	var infobox;

	$scope.init = function() {

		$scope.stations = $scope.$storage.latestReadings;
		console.log('stations', $scope.stations);
		NgMap.getMap().then(function(map) {
			$scope.map = map;
		})
	}

	$scope.goToStations = function() {
		$state.go('app.stations');
	}

	$scope.stations = [];

	$scope.logMarkers = function(station) {
		console.log('station', station);
	};

	$scope.clickLegend = function() {
		console.log('click legend');
	};

	$scope.getStatus = function(station) {
		var status = '';
		if (station.station.is_online) {
			switch (station.concern_level) {
				case 'Good':
					status = 'good';
				break;
				case 'Fair':
					status = 'fair';
				break;
				case 'Unhealthy for Sensitive Groups.':
					status = 'unhealthy';
				break;
				case 'Very Unhealthy':
					status = 'very-unhealthy';
				break;
				case 'Acutely Unhealthy':
					status = 'acutely-unhealthy';
				break;
				case 'Emergency':
					status = 'emergency';
				break;
			}
		}

		return status;
		console.log('concern level', concern_level);
	};

	$scope.showInfobox = function(event, index, station) {
		console.log('station', station);
		$scope.station = station;
		$scope.map.showInfoWindow('station-details', 'station-marker-' + index);
	};

	$scope.getEmoji = function(station){
		if (station) {
			var value = station.highest_pollutant_value;
	        if (value <= 50) {
	            return 'img/image_good.png';
	        } else if (value > 50 && value <= 100) {
	            return 'img/image_fair.png';
	        } else if (value > 100 && value <= 150) {
	            return 'img/image_unhealthy.png';
	        } else if (value > 150 && value <= 200) {
	            return 'img/image_very_unhealthy.png';
	        } else if (value > 200 && value <= 300) {
	            return 'img/image_acutely.png';
	        } else{
	            return 'img/image_emergency.png';    
	        }	
		}
    };

    $scope.capsFirstLetter = function(pollutant){

    	if (pollutant == 'pm 10') {
    		pollutant = 'PM 10';	
    	} else if (pollutant == 'pm 2.5') {
    		pollutant = 'PM 2.5';
    	}

    	return pollutant;
    };

}])

