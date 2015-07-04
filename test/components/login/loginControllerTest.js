/**
 * Created by ivana on 04.07.15..
 */

define([
    'loginController',
    'authService'
], function (loginController) {

    describe('loginController', function () {

        /**
         * We have to load the couchPotato module on which other modules depend
         * and also the appModule which loads all services we need
         */
        beforeEach(module('scs.couch-potato'));
        beforeEach(module('loginModule'));
        beforeEach(module('appModule'));


        var scope, $httpBackend, AuthService, $timeout, state, $q, deferred;

        /**
         * Injecting the dependencies
         */
        beforeEach(inject(function ($controller, authService, $state, $rootScope) {
            scope = $rootScope.$new();
            state = $state;
            AuthService = authService;
            ctrl = $controller('loginController', {
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
            $httpBackend.when('POST', 'http://localhost:5005/api/v1/sessions')
                .respond(200, {success: true});
            $httpBackend.when('GET', 'components/login/loginView.html')
                .respond(200, {success: true});
            $httpBackend.when('GET', 'components/layout/layoutView.html')
                .respond(200, {success: true});
        }));

        beforeEach(function () {
            deferred = $q.defer();
            spyOn(scope, 'login').and.callThrough();
            spyOn(AuthService, 'login').and.returnValue(deferred.promise);

            scope.model = {
                'email': 'test@test.com',
                'password': 'test'
            };
            spyOn(state, 'go');
            spyOn(deferred.promise, 'then').and.callThrough();


        });

        beforeEach(function () {
            scope.login(scope.model.email, scope.model.password);
        });

        beforeEach(function () {
            deferred.resolve(scope.model);
            scope.$digest();
        });

        it('should have a model defined', function () {
            expect(scope.model).toBeDefined();
        });

        it('should call AuthService.login', function () {
            expect(AuthService.login).toHaveBeenCalled();
        });

        it('should set the state to app.home', function () {
            expect(state.go).toHaveBeenCalledWith('app.home');
        });
    });
});