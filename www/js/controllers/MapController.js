app.controller('MapController', ['$scope', '$state', function($scope, $state){
	console.log('MAP!!!');

	$scope.goToStations = function() {
		$state.go('app.stations');
	}
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
