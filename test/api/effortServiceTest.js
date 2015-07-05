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

        describe('createEffort', function () {
            var effort = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/efforts')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a POST request to api/v1/efforts', function () {
                EffortService.createEffort(effort);
                $httpBackend.expectPOST('http://localhost:5005/api/v1/efforts');
                $httpBackend.flush();
            });


            describe('createEffort request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(EffortService, 'createEffort').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    EffortService.createEffort(effort);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(effort);
                    $scope.$apply();
                });

            })


        });

        describe('editEffort', function () {
            var effort = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('PUT', 'http://localhost:5005/api/v1/efforts/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a PUT request to api/v1/efforts', function () {
                EffortService.editEffort(id, effort);
                $httpBackend.expectPUT('http://localhost:5005/api/v1/efforts/1');
                $httpBackend.flush();
            });


            describe('editEffort request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(EffortService, 'editEffort').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    EffortService.editEffort(id, effort);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(effort);
                    $scope.$apply();
                });

            })

        });

        describe('deleteEffort', function () {
            var effort = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('DELETE', 'http://localhost:5005/api/v1/efforts/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a DELETE request to api/v1/efforts', function () {
                EffortService.deleteEffort(id);
                $httpBackend.expectDELETE('http://localhost:5005/api/v1/efforts/1');
                $httpBackend.flush();
            });


            describe('deleteEffort request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(EffortService, 'deleteEffort').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    EffortService.deleteEffort(id);
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