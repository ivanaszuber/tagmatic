/**
 * Created by ivana on 28.06.15..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'lodash'
], function (ng, couchPotato, _) {

    "use strict";

    var todoModule = ng.module('todoModule', ['ui.router']);

    couchPotato.configureApp(todoModule);

    todoModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.todo', {
                url: '/todo',
                views: {
                    content: {
                        templateUrl: 'components/todo/todoView.html',
                        controller: 'todoController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([])
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
