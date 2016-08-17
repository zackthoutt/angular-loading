(function () {
    angular.module('zt.angular-loading')
        .provider('Loading', function LoadingSaving() {
            this.requestTypes = ['GET'];
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