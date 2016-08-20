(function () {
    angular.module('loading', ['zt.angular-loading'])

   	angular.module('loading')
   		.config(function(LoadingProvider) {
   			LoadingProvider.requestTypes = ['GET', 'PUT', 'DELETE'];
   		})
   	    .controller('loadingController', function loadingController($scope, Loading, $http) {
   	        var self = this;
   	        self.requestTypes = Loading.requestTypes;
   	        self.getExample = function() {
   	        	$http.get('http://fake-response.appspot.com/api/?sleep=2')
   	        		.then(function(response) {
   	        			console.log('GET request complete');
   	        		});
   	        };
   	        self.putExample = function() {
   	        	$http.put('http://fake-response.appspot.com/api/?sleep=2')
   	        		.then(function(response) {
   	        			console.log('GET request complete');
   	        		});
   	        };
   	        self.patchExample = function() {
   	        	$http.patch('http://fake-response.appspot.com/api/?sleep=2')
   	        		.then(function(response) {
   	        			console.log('GET request complete');
   	        		});
   	        };
   	        self.postExample = function() {
   	        	$http.post('http://fake-response.appspot.com/api/?sleep=2')
   	        		.then(function(response) {
   	        			console.log('GET request complete');
   	        		});
   	        };
   	        self.deleteExample = function() {
   	        	$http.delete('http://fake-response.appspot.com/api/?sleep=2')
   	        		.then(function(response) {
   	        			console.log('GET request complete');
   	        		});
   	        };
            self.showExample = function() {
                Loading.show();
            };
            self.hideExample = function() {
                Loading.hide();
            };
            self.showForExample = function(milliseconds) {
                Loading.showFor(milliseconds);
            };
   	    });

    angular.module('loading');
})();