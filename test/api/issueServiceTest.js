/**
 * Created by ivana on 05.07.15..
 */

define([
    'issueService'
], function (issueService) {

    describe('issueService', function () {

        beforeEach(module('appModule'));

        var ApiService, IssueService, q, $httpBackend, $scope, deferred, id = 1;

        beforeEach(inject(function (apiService, $q, $rootScope, issueService) {
            ApiService = apiService;
            IssueService = issueService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getIssueList', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/issues')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/issues', function () {
                IssueService.getIssueList();
                $httpBackend.expectGET('http://localhost:5005/api/v1/issues');
                $httpBackend.flush();
            });


            describe('getIssueList request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(IssueService, 'getIssueList').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    IssueService.getIssueList();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getIssue', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/issues/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/issues', function () {
                IssueService.getIssue(id);
                $httpBackend.expectGET('http://localhost:5005/api/v1/issues/1');
                $httpBackend.flush();
            });


            describe('getIssue request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(IssueService, 'getIssue').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                var issue = {
                    "name": "test",
                    "description": "test"
                }

                beforeEach(function () {
                    IssueService.getIssue(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(issue);
                    $scope.$apply();
                });

            })
        });

        describe('createIssue', function () {
            var issue = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/issues')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a POST request to api/v1/issues', function () {
                IssueService.createIssue(issue);
                $httpBackend.expectPOST('http://localhost:5005/api/v1/issues');
                $httpBackend.flush();
            });


            describe('createIssue request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(IssueService, 'createIssue').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    IssueService.createIssue(issue);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(issue);
                    $scope.$apply();
                });

            })


        });

        describe('editIssue', function () {
            var issue = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('PUT', 'http://localhost:5005/api/v1/issues/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a PUT request to api/v1/issues', function () {
                IssueService.editIssue(id, issue);
                $httpBackend.expectPUT('http://localhost:5005/api/v1/issues/1');
                $httpBackend.flush();
            });


            describe('editIssue request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(IssueService, 'editIssue').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    IssueService.editIssue(id, issue);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(issue);
                    $scope.$apply();
                });

            })

        });

        describe('deleteIssue', function () {
            var issue = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('DELETE', 'http://localhost:5005/api/v1/issues/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a DELETE request to api/v1/issues', function () {
                IssueService.deleteIssue(id);
                $httpBackend.expectDELETE('http://localhost:5005/api/v1/issues/1');
                $httpBackend.flush();
            });


            describe('deleteIssue request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(IssueService, 'deleteIssue').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    IssueService.deleteIssue(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(issue);
                    $scope.$apply();
                });

            })


        });
    });

});