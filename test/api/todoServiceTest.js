/**
 * Created by ivana on 05.07.15..
 */

define([
    'todoService'
], function (todoService) {

    describe('todoService', function () {

        beforeEach(module('appModule'));

        var ApiService, ToDoService, q, $httpBackend, $scope, deferred, id = 1;

        beforeEach(inject(function (apiService, $q, $rootScope, todoService) {
            ApiService = apiService;
            ToDoService = todoService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getToDoList', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/todos')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/todos', function () {
                ToDoService.getToDoList();
                $httpBackend.expectGET('http://localhost:5005/api/v1/todos');
                $httpBackend.flush();
            });


            describe('getToDoList request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ToDoService, 'getToDoList').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    ToDoService.getToDoList();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getToDo', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/todos/1')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/todos', function () {
                ToDoService.getToDo(id);
                $httpBackend.expectGET('http://localhost:5005/api/v1/todos/1');
                $httpBackend.flush();
            });


            describe('getToDo request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ToDoService, 'getToDo').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                var todo = {
                    "name": "test",
                    "description": "test"
                }

                beforeEach(function () {
                    ToDoService.getToDo(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(todo);
                    $scope.$apply();
                });

            })
        });

        describe('createToDo', function () {
            var todo = {
                "name": "test",
                "description": "test"
            };

            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/todos')
                    .respond(200, {
                        "name": "test",
                        "description": "test"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a POST request to api/v1/todos', function () {
                ToDoService.createToDo(todo);
                $httpBackend.expectPOST('http://localhost:5005/api/v1/todos');
                $httpBackend.flush();
            });


            describe('createToDo request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ToDoService, 'createToDo').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });


                beforeEach(function () {
                    ToDoService.createToDo(todo);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(todo);
                    $scope.$apply();
                });

            })


        });

    });

});