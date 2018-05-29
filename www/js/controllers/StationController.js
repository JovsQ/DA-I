app.controller('StationController', ['$localStorage', '$scope', '$stateParams', 'apiService', function($localStorage, $scope, $stateParams, apiService){
	console.log('Station Controller');

	$scope.reading = {};
	$scope.bgColor = 'lightgray';
	$scope.$storage = $localStorage;

	$scope.init = function() {
		console.log($stateParams.station_id);
		$scope.$storage.latestReadings.forEach(function(reading){
			if (reading.station.id == $stateParams.station_id) {
				$scope.reading = reading;
				setupColor();
				console.log('READING', $scope.reading);
			}
		});
	};

	function initDisplay() {
		// setupColor();
		$scope.bgColor = $scope.getColor();
	};

	function setupColor() {
		console.log('concern level', $scope.reading.concern_level);
		switch($scope.reading.concern_level) {
			case 'Good':
				$scope.bgColor = '#2EB050';
			break;
			case 'Fair':
				$scope.bgColor = '#FFFF00';
			break;
			case 'Unhealthy for sensitive group':
				$scope.bgColor = '#E46C0B';
			break;
			case 'Very Unhealthy':
				$scope.bgColor = '#F90F01';
			break;
			case 'Acutely Unhealthy':
				$scope.bgColor = '#7030A0';
			break;
			case 'Emergency':
				$scope.bgColor = '#990500';
			break;
			default:
				$scope.bgColor = '#2EB050';
			break;
		}
	};

	$scope.getColor = function(){
        // console.log("get color", station);
        var value = $scope.readings.highest_pollutant_value;
        if ($scope.readings.station.is_online) {
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
}]);