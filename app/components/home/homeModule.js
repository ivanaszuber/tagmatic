/**
 * Created by ivana on 27.06.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato, _) {
    'use strict';

    var homeModule = ng.module('homeModule', [
        'ui.router',
        'ngResource'
    ]);

    couchPotato.configureApp(homeModule);

    homeModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.home', {
                url: '/home',
                views: {
                    "content@app": {
                        templateUrl: 'components/home/homeView.html',
                        controller: 'homeController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                            ])
                        }
                    }
                },
                data: {
                    displayName: 'Home'
                }

            })


    });

    homeModule.run(function ($couchPotato) {
        homeModule.lazy = $couchPotato;
    });

    return homeModule;
});