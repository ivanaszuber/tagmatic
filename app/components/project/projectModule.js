/**
 * Created by ivana on 01.07.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'lodash'
], function (ng, couchPotato, _) {

    "use strict";

    var projectModule = ng.module('projectModule', [
        'ui.router',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.bootstrap'
    ]);

    couchPotato.configureApp(projectModule);

    projectModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.project', {
                url: '/project',
                views: {
                    content: {
                        templateUrl: 'components/project/projectsListView.html',
                        controller: 'projectsListController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([])
                        }
                    }
                }
            })
    });

    projectModule.run(function ($couchPotato) {
        projectModule.lazy = $couchPotato;
    });

    return projectModule;

});
