/**
 * Created by ivana on 05.07.15..
 */

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'lodash'
], function (ng, couchPotato, _) {

    "use strict";

    var boardModule = ng.module('boardModule', ['ui.router']);

    couchPotato.configureApp(boardModule);

    boardModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.board', {
                url: '/board',
                views: {
                    content: {
                        templateUrl: 'components/board/boardView.html',
                        controller: 'boardController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([])
                        }
                    }
                }
            })
    });

    boardModule.run(function ($couchPotato) {
        boardModule.lazy = $couchPotato;
    });

    return boardModule;

});
