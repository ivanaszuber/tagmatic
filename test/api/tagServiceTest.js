/**
 * Created by ivana on 05.07.15..
 */

define([
    'tagService'
], function (tagService) {

    describe('tagService', function () {

        beforeEach(module('appModule'));

        var ApiService, TagService, q, $httpBackend, $scope, deferred, id = 1;

        beforeEach(inject(function (apiService, $q, $rootScope, tagService) {
            ApiService = apiService;
            TagService = tagService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getTagList', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/tags')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/tags', function () {
                TagService.getTagList();
                $httpBackend.expectGET('http://localhost:5005/api/v1/tags');
                $httpBackend.flush();
            });


            describe('getTagList request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(TagService, 'getTagList').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    TagService.getTagList();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getTag', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/tags/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/tags', function () {
                TagService.getTag(id);
                $httpBackend.expectGET('http://localhost:5005/api/v1/tags/1');
                $httpBackend.flush();
            });


            describe('getTag request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(TagService, 'getTag').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                var tag = {
                    "name": "test",
                    "description": "test"
                }

                beforeEach(function () {
                    TagService.getTag(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(tag);
                    $scope.$apply();
                });

            })
        });

        describe('createTag', function () {
            var tag = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/tags')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a POST request to api/v1/tags', function () {
                TagService.createTag(tag);
                $httpBackend.expectPOST('http://localhost:5005/api/v1/tags');
                $httpBackend.flush();
            });


            describe('createTag request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(TagService, 'createTag').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    TagService.createTag(tag);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(tag);
                    $scope.$apply();
                });

            })


        });

        describe('editTag', function () {
            var tag = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('PUT', 'http://localhost:5005/api/v1/tags/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a PUT request to api/v1/tags', function () {
                TagService.editTag(id, tag);
                $httpBackend.expectPUT('http://localhost:5005/api/v1/tags/1');
                $httpBackend.flush();
            });


            describe('editTag request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(TagService, 'editTag').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    TagService.editTag(id, tag);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(tag);
                    $scope.$apply();
                });

            })

        });

        describe('deleteTag', function () {
            var tag = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('DELETE', 'http://localhost:5005/api/v1/tags/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a DELETE request to api/v1/tags', function () {
                TagService.deleteTag(id);
                $httpBackend.expectDELETE('http://localhost:5005/api/v1/tags/1');
                $httpBackend.flush();
            });


            describe('deleteTag request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(TagService, 'deleteTag').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    TagService.deleteTag(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(tag);
                    $scope.$apply();
                });

            })


        });
    });

});