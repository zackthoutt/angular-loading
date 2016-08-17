(function() {
    angular.module('zt.angular-loading')
        .directive('loading', function ($http, $timeout, Loading) {
            return {
                priority: -1000,
                restrict: 'A',
                link: function ($scope, elm, attrs)
                {
                    var latencyThresholdReached = false;
                    var latencyTimeoutSet = false;
                    $scope.isLoading = function () {
                        var numRequests = 0;
                        if (Loading.forceLoading) {
                            return true;
                        }
                        if (!latencyTimeoutSet) {
                            $timeout(function() {
                                latencyThresholdReached = true;
                            }, Loading.latencyThreshold);
                            latencyTimeoutSet = true;
                        }
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
                        if (numRequests === 0 && latencyThresholdReached === true) {
                            latencyTimeoutSet = false;
                            latencyThresholdReached = false;
                        }
                        return numRequests > 0;
                    };
                    $scope.$watch($scope.isLoading, function (status)
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