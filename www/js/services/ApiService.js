app.service('apiService', ['$http', '$q', function($http, $q){
	var self = this;

	var authdata = "YWRtaW5AYXZpbm5vdnouY29tOlBAc3N3MHJk";
	var base_url = "http://54.255.149.40:9000";

	$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

	this.getAllReadings = function(){
		var deferred = $q.defer();
   
    	$http.get(base_url + "/api/v1/readings")
        .success(function(data) {
        	deferred.resolve(data);
        })
        .error(function(data) {
          	deferred.reject(data);
        });

		return deferred.promise;
	};

	this.getAllLatestReadings = function(){
		var deferred = $q.defer();

		$http.get(base_url + "/api/v1/readings/latest")
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(data){
			deferred.reject(data);
		});

		return deferred.promise;
	};

	this.getAllLatestReadingsByStation = function(stationId){
		var deferred = $q.defer();

		$http.get(base_url + "/api/v1/readings/latest?station=" + stationId)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(data){
			deferred.reject(data);
		});

		return deferred.promise;
	};

	this.getAllStations = function(){
		var deferred = $q.defer();

		$http.get(base_url + "/api/v1/stations")
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(data){
			deferred.reject(data);
		})

		return deferred.promise;
	};

	this.getStationDetails = function(stationId){
		var deferred = $q.defer();
		var station = {};

		$http.get(base_url + "/api/v1/stations")
		.success(function(data){
			data.forEach(function(dataSnapshot) {
				if (dataSnapshot.id == stationId) {
					console.log("ID MATCHED");
					deferred.resolve(dataSnapshot);
				}	
			})
		})
		.error(function(data){
			deferred.reject(data);
		})

		return deferred.promise;
	};

	this.getStationsWithReadings = function(){
		var deferred = $q.defer();
		var readings = [];
		var promises = [];

		this.getAllStations()
		.then(function(stations){
			stations.forEach(function(station){
		        if (station.station_name != 'Naga City, Camarines Sur' &&
                station.station_name != 'Pasay Station' &&
                station.station_name != 'Navotas Station' &&
                station.station_name != 'North Caloocan Station') {
                	promises.push(self.getReadingsWithStation(station)
                		.then(function(latestReadings){
                			readings.push(latestReadings);
                		}));
                }
			});

			$q.all(promises)
			.then(function(response){
				deferred.resolve(readings);
			})
			.catch(function(error){
				deferred.reject(error);
			})
		});

		return deferred.promise;
	};

	this.getReadingsWithStation = function(station){
		var deferred = $q.defer();
		console.log('STATION ID', station.id);

		self.getAllLatestReadingsByStation(station.id)
		.then(function(latestReadings){
			latestReadings.forEach(function(latestReading){
				latestReading.station = station;
			});
			deferred.resolve(latestReadings);
		})
		.catch(function(error){
			deferred.reject(error.message);
		})

		return deferred.promise;
	};

}]);