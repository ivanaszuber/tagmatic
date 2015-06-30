/**
 * Created by ivana on 27.06.15..
 */
var require = {
    waitSeconds: 0,
    paths: {

        'jquery': ['../lib/jquery/dist/jquery.min'],
        'jquery-ui': '../lib/jquery-ui/jquery-ui.min',
        'bootstrap': '../lib/bootstrap/dist/js/bootstrap.min',
        'angular': ['../lib/angular/angular.min'],
        'angular-resource': ['../lib/angular-resource/angular-resource.min'],
        'angular-sanitize': ['../lib/angular-sanitize/angular-sanitize.min'],
        'domReady': ['../lib/requirejs-domready/domReady'],
        'angular-ui-router': ['../lib/angular-ui-router/release/angular-ui-router.min'],
        'ngRoute': ['../lib/angular-route/angular-route.min'],
        'angular-bootstrap': ['../lib/angular-bootstrap/ui-bootstrap-tpls.min'],
        'angular-couch-potato': ['../lib/angular-couch-potato/dist/angular-couch-potato'],
        'lodash': ['../lib/lodash/dist/lodash.min'],
        'ui.grid': ['../lib/angular-ui-grid/ui-grid'],
        'modules-includes': 'appIncludes'
    },
    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']},
        'angular-resource': {deps: ['angular']},
        'angular-sanitize': {deps: ['angular']},
        'angular-bootstrap': {deps: ['angular']},
        'angular-ui-router': {deps: ['angular']},
        'jquery-ui': { deps: ['jquery']},
        'ui.grid': {deps: ['angular']},
        'ngRoute': {deps: ['angular']},
        'angular-couch-potato': {deps: ['angular']},
        'bootstrap': {deps: ['jquery']},
        'modules-includes': {deps: ['angular']}

    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ]
};