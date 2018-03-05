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
}]);