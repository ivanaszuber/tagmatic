/**
 * Created by ivana on 04.07.15..
 */
define([
    'authService'
], function (authService) {

    describe('authService', function () {

        beforeEach(module('appModule'));

        var AuthService, q, $httpBackend, $scope, deferred, email = 'test@test.com';

        beforeEach(inject(function (authService, $q, $rootScope) {
            AuthService = authService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('User Login', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/sessions')
                    .respond(200, {email: email, success: true});
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
            }));

            beforeEach(function () {
                AuthService.login(email, 1);
            });

            it('should send a login POST request to the rest-auth API', function () {
                $httpBackend.expectPOST('http://localhost:5005/api/v1/sessions');
                $httpBackend.flush();
            });


            describe('User login request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(AuthService, 'login').and.callThrough();
                    spyOn(AuthService, 'request').and.returnValue(deferred.promise);

                    spyOn(deferred.promise, 'then').and.callThrough();
                });

                beforeEach(function () {
                    AuthService.login(email, 1);
                });


                it('should call request', function () {
                    expect(AuthService.request).toHaveBeenCalled();
                });


                it('should call the then function of the request', function () {
                    expect(deferred.promise.then).toHaveBeenCalled();
                });

            })
        });


        describe('User Logout', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5005/api/v1/logout')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
            }));

            beforeEach(function () {
                AuthService.logout();
            });

            it('should send a logout POST request to the rest-auth API', function () {
                $httpBackend.expectPOST('http://localhost:5005/api/v1/logout');
                $httpBackend.flush();
            });

            describe('User logout request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(AuthService, 'logout').and.callThrough();
                    spyOn(AuthService, 'request').and.returnValue(deferred.promise);

                    spyOn(deferred.promise, 'then').and.callThrough();
                });

                beforeEach(function () {
                    AuthService.logout();
                });


                it('should call request', function () {
                    expect(AuthService.request).toHaveBeenCalled();
                });


                it('should call the then function of the request', function () {
                    expect(deferred.promise.then).toHaveBeenCalled();
                });

            })
        });

    });
});