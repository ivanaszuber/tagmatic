/**
 * Created by ivana on 30.06.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('contactsController', function ($scope, $state, contactService, $modal, $rootScope) {

        $scope.contacts = [];

        $scope.gridContacts = {
            columnDefs: [
                {
                    field: 'image_url',
                    displayName:'',
                    width:60,
                    cellTemplate: '<div class="ui-grid-cell-contents" class="f20"><i class="md md-settings-backup-restore yellow lighten-2 icon-color"></i></div>'
                },
                {field: 'first_name', displayName: 'First Name'},
                {field: 'last_name', displayName: 'Last Name'},
                {field: 'created_at', displayName: 'Create On', cellFilter: "date:'yyyy-MM-dd'"},
                {field: 'text', displayName: 'Summary'},
                {
                    field: 'id',
                    displayName: 'id',
                    cellTemplate: 'buttons.html'
                }
            ],
            data: 'contacts',
            multiSelect: true,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false
        };

        //this needs to be refactored
        $rootScope.getContacts = function () {
            contactService.getContactList()
                .then(function (contacts) {
                    $scope.contacts = contacts;
                });
        };


        $rootScope.editContact =
            function (id) {
                $modal.open({
                    templateUrl: 'components/contact/contactItemView.html',
                    controller: function ($scope, $modalInstance) {
                        contactService.getContact(id)
                            .then(function (contact) {
                                $scope.contact = contact;
                            });

                        $scope.submitted = false;

                        $scope.edit = function (isValid) {

                            $scope.submitted = true;

                            if (isValid) {
                                contactService.editContact(id, $scope.contact).then(function () {
                                    $modalInstance.close();
                                    $rootScope.getContacts();
                                });
                            }
                            ;

                        };

                        $scope.closeModal = function () {
                            $modalInstance.close();
                        }
                    }
                });
            }


        $scope.createContact = function () {
            $modal.open({
                templateUrl: 'components/contact/contactItemView.html',
                controller: function ($scope, $modalInstance) {
                    $scope.contact = {};
                    $scope.submitted = false;

                    $scope.create = function (isValid) {

                        $scope.submitted = true;

                        if (isValid) {
                            contactService.createContact($scope.contact).then(function () {
                                $modalInstance.close();
                                $rootScope.getContacts();
                            });
                        }
                        ;

                    };

                    $scope.closeModal = function () {
                        $modalInstance.close();
                    }
                }
            });
        };

        $scope.getContacts();
    })
});