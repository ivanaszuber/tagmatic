/**
 * Created by ivana on 30.06.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'lodash'
], function (ng, couchPotato, _) {

    "use strict";

    var contactsModule = ng.module('contactsModule', [
        'ui.router',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.bootstrap'
    ]);

    couchPotato.configureApp(contactsModule);

    contactsModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.contact', {
                url: '/contact',
                views: {
                    content: {
                        templateUrl: 'components/contact/contactsView.html',
                        controller: 'contactsController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([])
                        }
                    }
                }
            })
    });

    contactsModule.run(function ($couchPotato) {
        contactsModule.lazy = $couchPotato;
    });

    return contactsModule;

});
