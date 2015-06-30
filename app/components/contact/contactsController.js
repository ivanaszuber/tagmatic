/**
 * Created by ivana on 30.06.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('contactsController', function ($scope, $state, contactService) {

        $scope.contacts = [];

        $scope.gridContacts = {
            columnDefs: [{field: 'getFirstAndLastName()', displayName: 'Name'},
                {field: 'first_name', displayName: 'First Name'},
                {field: 'last_name', displayName: 'Last Name'},
                {field: 'created_at', displayName: 'Create On', cellFilter: "date:'yyyy-MM-dd'"},
                {field: 'text', displayName: 'Summary'}],
            data: 'contacts',
            multiSelect: true,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false
        };

        contactService.getContactList()
            .then(function (contacts) {
                $scope.contacts = contacts;
            });
    })
});