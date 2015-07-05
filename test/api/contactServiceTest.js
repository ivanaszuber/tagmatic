/**
 * Created by ivana on 04.07.15..
 */

define([
    'contactService'
], function (contactService) {

    describe('contactService', function () {

        beforeEach(module('appModule'));

        var ApiService, ContactService, q, $httpBackend, $scope, deferred, id = 1;

        beforeEach(inject(function (apiService, $q, $rootScope, contactService) {
            ApiService = apiService;
            ContactService = contactService;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getContactList', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/contacts')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/contacts', function () {
                ContactService.getContactList();
                $httpBackend.expectGET('http://localhost:5005/api/v1/contacts');
                $httpBackend.flush();
            });


            describe('getContactList request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ContactService, 'getContactList').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    ContactService.getContactList();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getContact', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5005/api/v1/contacts/1')
                    .respond(200, {
                        "first_name": "test",
                        "last_name": "test",
                        "created_at": "2015-06-10T04:19:35.919495Z"
                    });
                $httpBackend.when('GET', 'components/layout/layoutView.html')
                    .respond(200);
                $httpBackend.when('GET', 'components/todo/todoView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/v1/contacts', function () {
                ContactService.getContact(id);
                $httpBackend.expectGET('http://localhost:5005/api/v1/contacts/1');
                $httpBackend.flush();
            });


            describe('getContact request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ContactService, 'getContact').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                var contact = {
                    "first_name": "test",
                    "last_name": "test",
                    "created_at": "2015-06-10T04:19:35.919495Z"
                }

                beforeEach(function () {
                    ContactService.getContact(id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(contact);
                    $scope.$apply();
                });

            })
        });

    });

});