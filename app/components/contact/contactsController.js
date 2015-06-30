/**
 * Created by ivana on 30.06.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('contactsController', function ($scope, $state, contactService) {

        $scope.contacts = [];

        contactService.getContactList()
            .then(function (contacts) {
                $scope.contacts = contacts;
            });
    })
});