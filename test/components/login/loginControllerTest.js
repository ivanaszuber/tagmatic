/**
 * Created by ivana on 04.07.15..
 */

define([
    'loginController',
    'appModule'
], function (loginController) {

    describe('loginController', function () {

        /**
         * We have to load the couchPotato module on which other modules depend
         * and also the appModule which loads all services we need
         */
        beforeEach(module('scs.couch-potato'));
        beforeEach(module('loginModule'));
        beforeEach(module('appModule'));


        var scope, $httpBackend, AuthService, $timeout, state, $q;

        /**
         * Injecting the dependencies
         */
        beforeEach(inject(function ($controller, authService, $state) {
            scope = {};
            AuthService = {};
            state = $state;
            ctrl = $controller('loginController', {
                $scope: scope,
                $state: state,
                AuthService: authService
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
            scope.model = {
                'email': 'test@test.com',
                'password': 'test'
            };
            spyOn(state, 'go');
            scope.login(scope.model.email, scope.model.password);
        });

        it('should have a model defined', function () {
            expect(scope.model).toBeDefined();
        });

        it('should successfully log in the user', function () {
            $httpBackend.expectPOST('http://localhost:5005/api/v1/sessions');
            $httpBackend.flush();
        });
    });
});