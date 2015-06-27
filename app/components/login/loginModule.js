/**
 * Created by ivana on 27.06.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {
    "use strict";

    var module = ng.module('loginModule', [
        'ui.router'
    ]);
    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: "components/login/loginView.html",
                        controller: 'loginController'
                    }
                }
            })
            .state('logout', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: "components/login/loginView.html",
                        controller: function ($scope, $location, authService) {
                            authService.logout();
                        },
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'api/authService'
                            ])
                        }
                    }
                }
            })
    }),
        module.run(function ($couchPotato) {
            module.lazy = $couchPotato;
        });
    return module;
});