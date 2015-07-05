/**
 * Created by ivana on 05.07.15..
 */

define([
    'effortService'
], function (effortService) {

    describe('effortService', function () {

        beforeEach(module('appModule'));

        var ApiService, EffortService, q, $httpBackend, $scope, deferred, id = 1;

        beforeEach(inject(function (apiService, $q, $rootScope, effortService) {
            ApiService = apiService;
            EffortService = effortService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getEffortList', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/efforts')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/efforts', function () {
                EffortService.getEffortList();
                $httpBackend.expectGET('http://localhost:5005/api/v1/efforts');
                $httpBackend.flush();
            });


            describe('getEffortList request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(EffortService, 'getEffortList').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    EffortService.getEffortList();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getEffort', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/efforts/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/efforts', function () {
                EffortService.getEffort(id);
                $httpBackend.expectGET('http://localhost:5005/api/v1/efforts/1');
                $httpBackend.flush();
            });


            describe('getEffort request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(EffortService, 'getEffort').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                var effort = {
                    "name": "test",
                    "description": "test"
                }

                beforeEach(function () {
                    EffortService.getEffort(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(effort);
                    $scope.$apply();
                });

            })
        });

    });

});