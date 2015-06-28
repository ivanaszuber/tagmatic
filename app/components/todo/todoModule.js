/**
 * Created by ivana on 28.06.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {

    "use strict";

    var todoModule = ng.module('todoModule', ['ui.router']);

    couchPotato.configureApp(todoModule);

    todoModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.todo', {
                abstract: true,
                reloadOnSearch: false,
                views: {
                    content: {
                        templateUrl: 'components/todo/todoView.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                            ])
                        }
                    }
                }
            })
    });

    todoModule.run(function ($couchPotato) {
        todoModule.lazy = $couchPotato;
    });

    return todoModule;

});
