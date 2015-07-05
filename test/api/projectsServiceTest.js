/**
 * Created by ivana on 05.07.15..
 */

define([
    'projectsService'
], function (projectsService) {

    describe('projectsService', function () {

        beforeEach(module('appModule'));

        var ApiService, ProjectService, q, $httpBackend, $scope, deferred, id = 1;

        beforeEach(inject(function (apiService, $q, $rootScope, projectsService) {
            ApiService = apiService;
            ProjectService = projectsService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getProjectList', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/projects')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/projects', function () {
                ProjectService.getProjectList();
                $httpBackend.expectGET('http://localhost:5005/api/v1/projects');
                $httpBackend.flush();
            });


            describe('getProjectList request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ProjectService, 'getProjectList').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    ProjectService.getProjectList();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getProject', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/projects/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/projects', function () {
                ProjectService.getProject(id);
                $httpBackend.expectGET('http://localhost:5005/api/v1/projects/1');
                $httpBackend.flush();
            });


            describe('getProject request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ProjectService, 'getProject').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                var projects = {
                    "name": "test",
                    "description": "test"
                }

                beforeEach(function () {
                    ProjectService.getProject(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(projects);
                    $scope.$apply();
                });

            })
        });

        describe('createProject', function () {
            var project = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/projects')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a POST request to api/v1/projects', function () {
                ProjectService.createProject(project);
                $httpBackend.expectPOST('http://localhost:5005/api/v1/projects');
                $httpBackend.flush();
            });


            describe('createProject request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ProjectService, 'createProject').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    ProjectService.createProject(project);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(project);
                    $scope.$apply();
                });

            })


        });

        describe('editProject', function () {
            var project = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('PUT', 'http://localhost:5005/api/v1/projects/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a PUT request to api/v1/projects', function () {
                ProjectService.editProject(id, project);
                $httpBackend.expectPUT('http://localhost:5005/api/v1/projects/1');
                $httpBackend.flush();
            });


            describe('editProject request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ProjectService, 'editProject').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    ProjectService.editProject(id, project);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(project);
                    $scope.$apply();
                });

            })

            describe('deleteProject', function () {
                var project = {
                    "name": "test",
                    "description": "test"
                };

                beforeEach(inject(function ($injector) {
                    $httpBackend = $injector.get('$httpBackend');
                    $httpBackend.when('DELETE', 'http://localhost:5005/api/v1/projects/1')
                        .respond(200, {
                            "name": "test",
                            "description": "test"
                        });
                    $httpBackend.when('GET', 'components/layout/layoutView.html')
                        .respond(200);
                    $httpBackend.when('GET', 'components/todo/todoView.html')
                        .respond(200);
                }));

                it('should send a DELETE request to api/v1/projects', function () {
                    ProjectService.deleteProject(id);
                    $httpBackend.expectDELETE('http://localhost:5005/api/v1/projects/1');
                    $httpBackend.flush();
                });


                describe('deleteProject request chain', function () {
                    beforeEach(function () {
                        deferred = q.defer();

                        spyOn(ProjectService, 'deleteProject').and.callThrough();
                        spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                    });


                    beforeEach(function () {
                        ProjectService.deleteProject(id);
                    });


                    it('should call apiService.request', function () {
                        expect(ApiService.request).toHaveBeenCalled();
                        deferred.resolve(project);
                        $scope.$apply();
                    });

                })


            });

        });
    });

});