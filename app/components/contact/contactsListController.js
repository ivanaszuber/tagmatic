/**
 * Created by ivana on 30.06.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('contactsController', function ($scope, $state, contactService, $modal, $rootScope) {

        $scope.contacts = [];

        $scope.selected = [];

        $scope.gridContacts = {
            columnDefs: [
                {
                    field: 'image_url',
                    displayName: '',
                    width: 60,
                    enableColumnMenu: false,
                    enableSorting: false,
                    cellTemplate: '<div class="ui-grid-cell-contents" class="f20"><i class="md md-settings-backup-restore yellow lighten-2 icon-color"></i></div>'
                },
                {field: 'first_name', displayName: 'First Name'},
                {field: 'last_name', displayName: 'Last Name'},
                {field: 'created_at', displayName: 'Create On', cellFilter: "date:'yyyy-MM-dd'"},
                {field: 'text', displayName: 'Summary'},
                {
                    field: 'id',
                    displayName: '',
                    cellTemplate: 'editButton.html',
                    width: 40,
                    enableColumnMenu: false,
                    enableSorting: false
                },
                {
                    field: 'id',
                    displayName: '',
                    cellTemplate: 'viewButton.html',
                    width: 40,
                    enableColumnMenu: false,
                    enableSorting: false
                },
                {
                    field: 'id',
                    displayName: '',
                    cellTemplate: 'deleteButton.html',
                    width: 40,
                    enableColumnMenu: false,
                    enableSorting: false
                }
            ],
            data: 'contacts',
            multiSelect: true,
            enableColumnMenu: false,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false
        };

        $scope.gridContacts.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                contactService.getContact(row.entity.id)
                    .then(function (contact) {
                        contact.is_selected = true;
                        $scope.selected.push(contact);
                    });
            });
        };

        //this needs to be refactored
        $rootScope.getContacts = function () {
            contactService.getContactList()
                .then(function (contacts) {
                    $scope.contacts = contacts;
                    $scope.contactsNumber = contacts.length;
                });
        };

        $scope.deleteContacts = function () {
            angular.forEach($scope.selected, function (contact) {
                contactService.deleteContact(contact.id).then(function () {
                    $rootScope.getContacts();
                })
            })
        };


        $rootScope.editContact =
            function (id) {
                $modal.open({
                    templateUrl: 'components/contact/contactEditView.html',
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
            };

        $rootScope.viewContact =
            function (id) {
                $modal.open({
                    templateUrl: 'components/contact/contactViewView.html',
                    controller: function ($scope, $modalInstance) {
                        contactService.getContact(id)
                            .then(function (contact) {
                                $scope.contact = contact;
                            });

                        $scope.closeModal = function () {
                            $modalInstance.close();
                        }
                    }
                });
            };

        $scope.createContact = function () {
            $modal.open({
                templateUrl: 'components/contact/contactCreateView.html',
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

        $rootScope.deleteContact = function (id) {
            contactService.getContact(id)
                .then(function (contact) {
                    $scope.contact = contact;
                    contactService.deleteContact(id).then(function (data) {
                        $scope.contacts = data;
                    })
                });
        };

        $scope.getContacts();
    })
});