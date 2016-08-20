(function() {
    angular.module('zt.angular-loading')
        .directive('loading', function ($http, $timeout, Loading) {
            return {
                priority: -1000,
                restrict: 'A',
                link: function ($scope, elm, attrs)
                {
                    var self = this;
                    self.latencyThresholdReached = false;
                    self.latencyTimeoutSet = false;
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
                        if (numRequests === 0 && self.latencyThresholdReached === true) {
                            self.latencyTimeoutSet = false;
                            self.latencyThresholdReached = false;
                        }
                    };
                    self.setLatencyTimeout = function() {
                        if (!self.latencyTimeoutSet) {
                            $timeout(function() {
                                self.latencyThresholdReached = true;
                            }, Loading.latencyThreshold);
                            self.latencyTimeoutSet = true;
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
                            if (self.latencyThresholdReached) {
                                numRequests += 1;
                            }
                        }
                        return numRequests;
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