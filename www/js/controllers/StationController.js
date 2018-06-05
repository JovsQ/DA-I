app.controller('StationController', ['$ionicModal', '$localStorage', '$scope', '$stateParams', 'apiService', function($ionicModal, $localStorage, $scope, $stateParams, apiService){
	console.log('Station Controller');

	$scope.reading = {};
	$scope.bgColor = 'lightgray';
	$scope.$storage = $localStorage;
	$scope.selectedPollutant = {};
	$scope.otherPollutants = [];

	var PMS_POLLUTANTS = ['pm 10', 'pm 2.5', 'Humidity', 'Temperature'];
	var DOAS_POLLUTANTS = ['Carbon Monoxide', 'Sulphur Dioxide', 'Nitrogen Dioxide', 'Ozone', 'pm 10', 'pm 2.5', 'Humidity', 'Temperature'];

	$scope.init = function() {
		console.log($stateParams.station_id);
		$scope.$storage.latestReadings.forEach(function(reading){
			if (reading.station.id == $stateParams.station_id) {
				$scope.reading = reading;
				$scope.selectedPollutant.pollutant = reading.highest_pollutant;
				$scope.buildReadings(reading.highest_pollutant, reading.highest_pollutant_value);
				console.log('READING', $scope.reading);
				
			}
		});
	};

	$scope.sampler = function(){
		console.log('test click');
	}

	$scope.buildReadings = function(pollutantSnapshot, pollutantReadings) {
		if (pollutantReadings == 0) {

		} else {
		$scope.selectedPollutant = {};
		$scope.otherPollutants = [];
		if ($scope.reading.station.station_type == 'PMS') {
			for (var i = 0; i < PMS_POLLUTANTS.length; i++) {
				var pollutant = {};
				pollutant.pollutant_name = PMS_POLLUTANTS[i];
				switch(PMS_POLLUTANTS[i]) {
					case 'Carbon Monoxide':
						pollutant.pollutant_value = $scope.reading.aqi_carbon_monoxide;
					break;
					case 'Sulphur Dioxide':
						pollutant.pollutant_value = $scope.reading.aqi_sulphur_dioxide;
					break;
					case 'Nitrogen Dioxide':
						pollutant.pollutant_value = $scope.reading.aqi_nitrogen_dioxide;
					break;
					case 'Ozone':
						pollutant.pollutant_value = $scope.reading.aqi_ozone;
					break;
					case 'pm 10':
						pollutant.pollutant_value = $scope.reading.aqi_pm10;
					break;
					case 'pm 2.5':
						pollutant.pollutant_value = $scope.reading.aqi_pm25;
					break;
					case 'Humidity':
						pollutant.pollutant_value = $scope.reading.humidity;
					break;
					case 'Temperature':
						pollutant.pollutant_value = $scope.reading.temperature;
					break;
				}
				if (pollutantSnapshot == PMS_POLLUTANTS[i]) {
					$scope.selectedPollutant = pollutant;
					setupColor(pollutant);
				} else {
					$scope.otherPollutants.push(pollutant);	
				}				
			}
		} else {
			for (var i = 0; i < DOAS_POLLUTANTS.length; i++) {
				var pollutant = {};
				pollutant.pollutant_name = DOAS_POLLUTANTS[i];
				switch(DOAS_POLLUTANTS[i]) {
					case 'Carbon Monoxide':
						pollutant.pollutant_value = $scope.reading.aqi_carbon_monoxide;
					break;
					case 'Sulphur Dioxide':
						pollutant.pollutant_value = $scope.reading.aqi_sulphur_dioxide;
					break;
					case 'Nitrogen Dioxide':
						pollutant.pollutant_value = $scope.reading.aqi_nitrogen_dioxide;
					break;
					case 'Ozone':
						pollutant.pollutant_value = $scope.reading.aqi_ozone;
					break;
					case 'pm 10':
						pollutant.pollutant_value = $scope.reading.aqi_pm10;
					break;
					case 'pm 2.5':
						pollutant.pollutant_value = $scope.reading.aqi_pm25;
					break;
					case 'Humidity':
						pollutant.pollutant_value = $scope.reading.humidity;
					break;
					case 'Temperature':
						pollutant.pollutant_value = $scope.reading.temperature;
					break;
				}

				if (pollutantSnapshot == DOAS_POLLUTANTS[i]) {
					$scope.selectedPollutant = pollutant;
				} else {
					$scope.otherPollutants.push(pollutant);	
				}
			}
		}

			
		}
		console.log('other pollutants', $scope.otherPollutants);
	}

	$ionicModal.fromTemplateUrl('templates/modal-other-pollutants.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

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
			case 'Unhealthy for Sensitive Groups.':
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

	function getHumidity(value) {
		if (value <= 20) {
			return '#e5f6fb';
		} else if (value > 20 && value <= 40) {
			return '#b2e6f4';
		} else if (value > 40 && value <= 60) {
			return '#7fd6ed';
		} else if (value > 60 && value <= 80) {
			return '#4cc6e5';
		} else {
			return '#19b6de';
		}

	};

	function getTemp(value) {
		if (value <= 5) {
			return '#fee4d1';
		} else if (value > 5 && value <= 10) {
			return '#ecb48d';
		} else if (value > 10 && value <= 20) {
			return '#ec8035';
		} else if (value > 20 && value <= 30) {
			return '#e15b00';
		} else if (value > 30 && value <= 40) {
			return '#a94400';
		} else {
			return '#923b00';
		}

	};
	
	function setupColor(pollutant) {
		if (pollutant.pollutant_name == 'Humidity') {
			$scope.bgColor = "#00c7ff";
		} else if (pollutant.pollutant_name == 'Temperature') {
			$scope.bgColor = "#8B4513";
		} else {
			var value = pollutant.pollutant_value;
			if (value == 0) {
				$scope.bgColor = 'lightgray';
			} else if (value <= 50) {
	            $scope.bgColor = '#2EB050';
	        } else if (value > 50 && value <= 100) {
	            $scope.bgColor = '#FFFF00';
	        } else if (value > 100 && value <= 150) {
	            $scope.bgColor = '#E46C0B';
	        } else if (value > 150 && value <= 200) {
	            $scope.bgColor = '#F90F01';
	        } else if (value > 200 && value <= 300) {
	            $scope.bgColor = '#7030a0';
	        } else{
	            $scope.bgColor = '#990500';    
	        }	
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

    $scope.fetchColor = function(pollutant) {
    	if (pollutant.pollutant_name == 'Humidity') {
    		return getHumidity(pollutant.pollutant_value);
    	} else if (pollutant.pollutant_name == 'Temperature') {
    		return getTemp(pollutant.pollutant_value);
    	} else {
    		var value = pollutant.pollutant_value;
	    	if (value == 0) {
	    		return ';lightgray';
	    	} else if (value <= 50) {
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
    	}
    };

    $scope.getEmoji = function(){
        var value = $scope.reading.highest_pollutant_value;
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

    $scope.changePollutant = function(){
    	console.log('change pollutant');
    };

    $scope.showGraph = function(){
    	console.log('show graph');
    };
}]);