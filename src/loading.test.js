describe('angular-loading', function() {
    var $rootScope, $httpBackend, $http, element, $timeout, Loading, $compile;
    beforeEach(angular.mock.module('zt.angular-loading'));
    beforeEach(inject(function($injector, _$compile_) {
        $compile = _$compile_;
        $rootScope = $injector.get('$rootScope');
        $timeout = $injector.get('$timeout');
        Loading = $injector.get('Loading');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('/test/')
            .respond(200, {'test': 'test'});
        $httpBackend.whenPATCH('/test/')
            .respond(200);
        $httpBackend.whenPOST('/test/')
            .respond(200);
        $httpBackend.whenPUT('/test/')
            .respond(200);
        $httpBackend.whenDELETE('/test/')
            .respond(200);
        element = $compile("<div loading></div>")($rootScope);
        Loading.requestTypes = ['GET', 'PUT'];
    }));
    describe('isLoading', function() {
        it('should return true when the API has been used to force the loading bar to show', function() {
            Loading.show();
            expect($rootScope.isLoading()).toEqual(true);
            Loading.hide();
            expect($rootScope.isLoading()).toEqual(false);
        });
        it('should return false when there are no pending requests', function() {
            $rootScope.$digest();
            expect($rootScope.isLoading()).toEqual(false);
        });
        it('should return false when there are pending requests, but none of them are registered request types', function() {
            $http.patch('/test/');
            $timeout.flush();
            $rootScope.$digest();
            expect($rootScope.isLoading()).toEqual(false);
            $httpBackend.flush();
            $http.post('/test/');
            $timeout.flush();
            $rootScope.$digest();
            expect($rootScope.isLoading()).toEqual(false);
            $httpBackend.flush();
            $http.delete('/test/');
            $timeout.flush();
            $rootScope.$digest();
            expect($rootScope.isLoading()).toEqual(false);
            $httpBackend.flush();
        });
        it('should return true when there are pending requests and at least one is a registered request type', function() {
            $http.get('/test/');
            $timeout.flush();
            $rootScope.$digest();
            expect($rootScope.isLoading()).toEqual(true);
            $httpBackend.flush();
            $http.put('/test/');
            $timeout.flush();
            $rootScope.$digest();
            expect($rootScope.isLoading()).toEqual(true);
            $httpBackend.flush();
        });
        it('should ignore any requests with the hideLoading attribute set to true', function() {
            $http.get('/test/', {hideLoading: true});
            $timeout.flush();
            $rootScope.$digest();
            expect($rootScope.isLoading()).toEqual(false);
            $httpBackend.flush();
        });
    });
    describe('DOM', function() {
        it('should not be visible when there are no pending GET requests', function() {
            $rootScope.$digest();
            expect(element[0].style.visibility).toEqual('hidden');
        });
        it('should be visible when there is a pending GET request', function() {
            $http.get('/test/');
            $timeout.flush();
            $rootScope.$digest();
            expect(element[0].style.visibility).toEqual('visible');
            $httpBackend.flush();
        });
    });
});