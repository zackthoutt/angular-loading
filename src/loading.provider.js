(function () {
    angular.module('zt.angular-loading')
        .provider('Loading', function Loading() {
            this.requestTypes = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
            this.latencyThreshold = 0;
            this.show = function() {
                this.forceLoading = true;
            }.bind(this);
            this.hide = function() {
                this.forceLoading = false;
            }.bind(this);
            this.$get = function() {
                return this;
            };
        });
})();