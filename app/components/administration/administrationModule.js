/**
 * Created by ivana on 03.07.15..
 */

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'lodash'
], function (ng, couchPotato, _) {

    "use strict";

    var administrationModule = ng.module('administrationModule', ['ui.router']);

    couchPotato.configureApp(administrationModule);

    administrationModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.administration', {
                url: '/administration',
                views: {
                    content: {
                        templateUrl: 'components/administration/administrationView.html',
                        controller: 'administrationController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([])
                        }
                    }
                }
            })
    });

    administrationModule.run(function ($couchPotato) {
        administrationModule.lazy = $couchPotato;
    });

    return administrationModule;

});
