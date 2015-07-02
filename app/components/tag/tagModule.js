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

    var tagModule = ng.module('tagModule', ['ui.router']);

    couchPotato.configureApp(tagModule);

    tagModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.tag', {
                url: '/tag',
                views: {
                    content: {
                        templateUrl: 'components/tag/tagView.html',
                        controller: 'tagController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([])
                        }
                    }
                }
            })
    });

    tagModule.run(function ($couchPotato) {
        tagModule.lazy = $couchPotato;
    });

    return tagModule;

});
