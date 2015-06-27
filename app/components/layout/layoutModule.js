/**
 * Created by ivana on 27.06.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {

    "use strict";

    var layoutModule = ng.module('layoutModule', ['ui.router']);

    couchPotato.configureApp(layoutModule);

    layoutModule.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                reloadOnSearch: false,
                views: {
                    root: {
                        templateUrl: 'components/layout/layoutView.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                            ])
                        }
                    }
                }
            })


        $urlRouterProvider.otherwise('/login');

    });

    layoutModule.run(function ($couchPotato) {
        layoutModule.lazy = $couchPotato;
    });

    return layoutModule;

});
