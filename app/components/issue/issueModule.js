/**
 * Created by ivana on 02.07.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'lodash'
], function (ng, couchPotato, _) {

    "use strict";

    var issueModule = ng.module('issueModule', [
        'ui.router',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.bootstrap'
    ]);

    couchPotato.configureApp(issueModule);

    issueModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.issue', {
                url: '/issue',
                views: {
                    content: {
                        templateUrl: 'components/issue/issuesListView.html',
                        controller: 'issuesListController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([])
                        }
                    }
                }
            })
    });

    issueModule.run(function ($couchPotato) {
        issueModule.lazy = $couchPotato;
    });

    return issueModule;

});
