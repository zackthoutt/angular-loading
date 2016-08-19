(function() {
    angular.module('zt.angular-loading')
        .directive('loading', function ($http, $timeout, Loading) {
            return {
                priority: -1000,
                restrict: 'A',
                link: function ($scope, elm, attrs)
                {
                    var self = this;
                    var latencyThresholdReached = false;
                    var latencyTimeoutSet = false;
                    $scope.isLoading = function () {
                        var numRequests;
                        if (Loading.forceLoading) {
                            return true;
                        }
                        self.setLatencyTimeout();
                        numRequests = self.calcNumRequests();
                        self.resetTimeout(numRequests);
                        return numRequests > 0;
                    };
                    self.resetTimeout = function(numRequests) {
                        if (numRequests === 0 && latencyThresholdReached === true) {
                            latencyTimeoutSet = false;
                            latencyThresholdReached = false;
                        }
                    };
                    self.setLatencyTimeout = function() {
                        if (!latencyTimeoutSet) {
                            $timeout(function() {
                                latencyThresholdReached = true;
                            }, Loading.latencyThreshold);
                            latencyTimeoutSet = true;
                        }
                    };
                    self.calcNumRequests = function() {
                        var numRequests = 0;
                        for (var i = $http.pendingRequests.length - 1; i >= 0; i--) {
                            if (Loading.requestTypes.indexOf($http.pendingRequests[i].method) < 0) {
                                continue;
                            }
                            if ($http.pendingRequests[i].hideLoading) {
                                continue;
                            }
                            if (latencyThresholdReached) {
                                numRequests += 1;
                            }
                        }
                        return numRequests
                    };
                    $scope.$watch($scope.isLoading, function(status)
                    {
                        if (status) {
                            elm[0].style.visibility = 'visible';
                        } else {
                            elm[0].style.visibility = 'hidden';
                        }
                    });
                }
            };
        });
})();