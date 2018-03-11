app.controller('MainController', ['$http', '$scope', 'apiService', function($http, $scope, apiService){

    $scope.stations = [];

	$scope.init = function(){
        apiService.getAllLatestReadings()
        .then(function(stations){
            stations.forEach(function(station){
                if (station.station.station_name != 'Naga City, Camarines Sur' &&
                station.station.station_name != 'Pasay Station' &&
                station.station.station_name != 'Navotas Station' &&
                station.station.station_name != 'North Caloocan Station') {
                    console.log('station', station);
                    $scope.stations.push(station);
                }
            });
        })
        .catch(function(error){
            console.log('error', error);
        });
  	};

    $scope.getColor = function(station){
        console.log("get color", station);
        if (station.is_online) {
            return 'yellow';
        } else {
            return 'lightgray';
        }

    };
}]);