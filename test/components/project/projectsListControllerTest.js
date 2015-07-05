/**
 * Created by ivana on 05.07.15..
 */
define([
    'projectsListController'
], function (projectsListController) {

    describe('projectsListController', function () {

        beforeEach(module('scs.couch-potato'));
        beforeEach(module('projectModule'));
        beforeEach(module('appModule'));

        var scope, $httpBackend, ProjectsService, ContactService, $timeout, state, deferred, deferred2, $q, rootScope;

        beforeEach(inject(function ($controller, projectsService, contactService, $state, $rootScope) {
            scope = $rootScope.$new();
            rootScope = $rootScope;
            ProjectsService = projectsService;
            ContactService = contactService;
            state = $state;
            ctrl = $controller('projectsListController', {
                $scope: scope
            });
        }));

        /**
         * Mocking http service responses
         */
        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $timeout = $injector.get('$timeout');
            $q = $injector.get('$q');
            $httpBackend.when('GET', 'http://localhost:5005/api/v1/projects')
                .respond(200, {success: true});
            $httpBackend.when('POST', 'http://localhost:5005/api/v1/projects')
                .respond(200, {success: true});
            $httpBackend.when('GET', 'components/layout/layoutView.html')
                .respond(200);
        }));

        describe('Project grid', function () {
            beforeEach(function () {
                deferred = $q.defer();
                deferred2 = $q.defer();

                spyOn(rootScope, 'getProjects').and.callThrough();
                spyOn(ProjectsService, 'getProjectList').and.returnValue(deferred.promise);
                spyOn(angular, 'forEach').and.callThrough();
                spyOn(ContactService, 'getContact').and.returnValue(deferred2.promise);

                spyOn(deferred.promise, 'then').and.callThrough();
                spyOn(deferred2.promise, 'then').and.callThrough();
            });

            beforeEach(function () {
                rootScope.getProjects();
            });

            it('should call ProjectsService.getProjectList', function () {
                expect(ProjectsService.getProjectList).toHaveBeenCalled();
            });


            it('should call the then function of the request', function () {
                expect(deferred.promise.then).toHaveBeenCalled();
            });

            describe('Set project grid data', function () {

                var user = {
                    id: "1",
                    first_name: "Ivana",
                    last_name: "Zuber"
                }
                var testData = [
                    {
                        "id": 1,
                        "name": "tagmatic",
                        "created_at": "2015-06-10T08:01:34.709107Z",
                        "user_id": "1"
                    },
                    {
                        "id": 2,
                        "name": "tagmatic2",
                        "created_at": "2015-06-10T08:01:34.709107Z",
                        "user_id": "2"
                    }
                ]

                beforeEach(function () {
                    deferred2.resolve(user);
                    deferred.resolve(testData);
                    scope.$digest();
                });


                it('should have a grid defined', function () {
                    expect(scope.gridProjects).toBeDefined();
                });

                it('should set the grid projects data', function () {
                    expect(scope.projects).toEqual(testData);
                });
            });
        })
    });
});