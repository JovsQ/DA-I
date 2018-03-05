app.controller('MainController', ['$http', '$scope', 'apiService', function($http, $scope, apiService){

	$scope.init = function(){
    	apiService.getAllReadings()
    	.then(function(readings){
    		console.log('readings', readings);
    	})
    	.catch(function(error){
    		console.log('error', error);
    	});
  	};
}]);