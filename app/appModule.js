/**
 * Created by ivana on 27.06.15..
 */
define([

    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource',
    'angular-bootstrap',
    'angular-sanitize',
    'ui.grid'
], function (ng, couchPotato) {

    var appModule = ng.module('appModule', [
        'scs.couch-potato',
        'ui.router',
        'ui.bootstrap',
        'ui.grid',
        'ngResource',

        'loginModule',
        'layoutModule',
        'todoModule',
        'contactsModule',
        'homeModule',
        'projectModule'
    ]);

    couchPotato.configureApp(appModule);

    appModule.config(function ($provide, $httpProvider) {

    });

    appModule.run(function ($couchPotato, $rootScope, $state, $stateParams) {
        appModule.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });


    return appModule;
});