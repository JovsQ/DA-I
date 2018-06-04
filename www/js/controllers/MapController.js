app.controller('MapController', ['$q', '$scope', '$state', 'apiService', 'NgMap', function($q, $scope, $state, apiService, NgMap){

	var infobox = {};
	$scope.map;
	$scope.station;
	var infobox;

	$scope.init = function() {
		fetchStations().then(function(){

			NgMap.getMap().then(function(map) {
				$scope.map = map;
			});
		});

		// this.showInfobox = this.showInfobox.bind(this);
	}

	$scope.goToStations = function() {
		$state.go('app.stations');
	}

	$scope.stations = [];

	function fetchStations() {
		var deferred = $q.defer();

		$scope.stations = [];
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

			console.log('stations', $scope.stations);
			deferred.resolve();
		})
		.catch(function(error){
			console.log('error', error);
			deferred.reject();
		})

		return deferred.promise;
	};

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

}])

// 'use strict';

// (function() {

//   class MainController {

//     constructor($http, NgMap) {
//       angular.extend(this, {
//         $http, NgMap,
//         infobox: {}
//       });
//     }

//     // THE INIT FUNCTION
//     $onInit() {
//       this.NgMap.getMap()
//         .then(map => this.map = map);

//       this.showInfobox = this.showInfobox.bind(this);
//     }

//     showInfobox (event, index, station) {
//       this.infobox.station = station;
//       this.map.showInfoWindow('station-details', 'station-marker-' + index);
//     }
//   }

//   angular.module('denrEmbAirWebDashboardApp')
//     .component('main', {
//       templateUrl: 'app/main/main.html',
//       controller: MainController,
//       controllerAs: 'vm'
//     });
// })();

