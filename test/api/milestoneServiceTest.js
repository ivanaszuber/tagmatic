/**
 * Created by ivana on 05.07.15..
 */

define([
    'milestoneService'
], function (milestoneService) {

    describe('milestoneService', function () {

        beforeEach(module('appModule'));

        var ApiService, MilestoneService, q, $httpBackend, $scope, deferred, id = 1;

        beforeEach(inject(function (apiService, $q, $rootScope, milestoneService) {
            ApiService = apiService;
            MilestoneService = milestoneService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getMilestoneList', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/milestones')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/milestones', function () {
                MilestoneService.getMilestoneList();
                $httpBackend.expectGET('http://localhost:5005/api/v1/milestones');
                $httpBackend.flush();
            });


            describe('getMilestoneList request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(MilestoneService, 'getMilestoneList').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    MilestoneService.getMilestoneList();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getMilestone', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/milestones/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/milestones', function () {
                MilestoneService.getMilestone(id);
                $httpBackend.expectGET('http://localhost:5005/api/v1/milestones/1');
                $httpBackend.flush();
            });


            describe('getMilestone request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(MilestoneService, 'getMilestone').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                var milestone = {
                    "name": "test",
                    "description": "test"
                }

                beforeEach(function () {
                    MilestoneService.getMilestone(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(milestone);
                    $scope.$apply();
                });

            })
        });

        describe('createMilestone', function () {
            var milestone = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/milestones')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a POST request to api/v1/milestones', function () {
                MilestoneService.createMilestone(milestone);
                $httpBackend.expectPOST('http://localhost:5005/api/v1/milestones');
                $httpBackend.flush();
            });


            describe('createMilestone request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(MilestoneService, 'createMilestone').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    MilestoneService.createMilestone(milestone);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(milestone);
                    $scope.$apply();
                });

            })


        });

        describe('editMilestone', function () {
            var milestone = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('PUT', 'http://localhost:5005/api/v1/milestones/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a PUT request to api/v1/milestones', function () {
                MilestoneService.editMilestone(id, milestone);
                $httpBackend.expectPUT('http://localhost:5005/api/v1/milestones/1');
                $httpBackend.flush();
            });


            describe('editMilestone request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(MilestoneService, 'editMilestone').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    MilestoneService.editMilestone(id, milestone);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(milestone);
                    $scope.$apply();
                });

            })

        });

        describe('deleteMilestone', function () {
            var milestone = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('DELETE', 'http://localhost:5005/api/v1/milestones/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a DELETE request to api/v1/milestones', function () {
                MilestoneService.deleteMilestone(id);
                $httpBackend.expectDELETE('http://localhost:5005/api/v1/milestones/1');
                $httpBackend.flush();
            });


            describe('deleteMilestone request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(MilestoneService, 'deleteMilestone').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    MilestoneService.deleteMilestone(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(milestone);
                    $scope.$apply();
                });

            })


        });
    });

});