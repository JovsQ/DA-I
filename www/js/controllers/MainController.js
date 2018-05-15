app.controller('MainController', ['$http', '$localStorage', '$scope', '$state', 'apiService', function($http, $localStorage, $scope, $state, apiService){

    $scope.stations = [];
    $scope.$storage = $localStorage;

	$scope.init = function(){
        // apiService.getStationsWithReadings()
        // .then(function(latestReadings){
        //     console.log('LATEST READINGS CONTROLLER', latestReadings);
        //     $scope.stations = latestReadings;
        // })
        // .catch(function(error){
        //     console.log('ERROR', error);
        // });

        $scope.stations = $scope.$storage.latestReadings;



        // apiService.getAllLatestReadings()
        // .then(function(stations){
        //     stations.forEach(function(station){
        //         if (station.station.station_name != 'Naga City, Camarines Sur' &&
        //         station.station.station_name != 'Pasay Station' &&
        //         station.station.station_name != 'Navotas Station' &&
        //         station.station.station_name != 'North Caloocan Station') {
        //             // console.log('station', station);
        //             $scope.stations.push(station);
        //         }
        //     });
        //     $scope.$storage.latestReadings = $scope.stations;
        // })
        // .catch(function(error){
        //     console.log('error', error);
        // });
  	};

    $scope.showDetails = function(station){
        // $scope.stations.forEach(function(station){
        //     console.log('station', station.concern_level);
        // })

        console.log('station', station);
        var stationId = station.station.id;
        if (station.is_online) {
           $state.go('app.station', {station_id: stationId}); 
       }
    };

    $scope.getColor = function(station){
        // console.log("get color", station);
        var value = station.highest_pollutant_value;
        if (station.is_online) {
            if (value <= 50) {
                return '#2EB050';
            } else if (value > 50 && value <= 100) {
                return '#FFFF00';
            } else if (value > 100 && value <= 150) {
                return '#E46C0B';
            } else if (value > 150 && value <= 200) {
                return '#F90F01';
            } else if (value > 200 && value <= 300) {
                return '#7030a0';
            } else{
                return '#990500';    
            }            
        } else {
            return 'lightgray';
        }
    };

    $scope.getEmoji = function(station){
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
    };
}]);