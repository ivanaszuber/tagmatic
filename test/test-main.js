var tests = [];
for (var file in window.__karma__.files) {
    if (/Test\.js$/.test(file)) {
        tests.push(file);
    }
}

require.config({

    baseUrl: '/base/app',

    paths: {
        /**
         * Vendor files that we have to load for the tests
         * These have been excluded in karma.conf
         */
        'jquery': '../lib/jquery/dist/jquery',
        'angular': '../lib/angular/angular',
        'angular-mocks': '../node_modules/angular-mocks/angular-mocks',
        'angular-couch-potato': '../lib/angular-couch-potato/dist/angular-couch-potato',
        'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router',
        'jquery-ui': '../lib/jquery-ui/jquery-ui',
        'underscore': '../lib/lodash/dist/lodash',
        'angular-cookies': '../lib/angular-cookies/angular-cookies',
        'angular-resource': '../lib/angular-resource/angular-resource.min',
        'angular-sanitize': '../lib/angular-sanitize/angular-sanitize.min',
        'angular-animate': '../lib/angular-animate/angular-animate.min',
        'domReady': '../lib/requirejs-domready/domReady',
        'ngRoute': '../lib/angular-route/angular-route.min',
        'angular-bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls.min',
        'summernote': '../lib/summernote/dist/summernote.min',
        'lodash': '../lib/lodash/dist/lodash.min',
        'ui.grid': '../lib/angular-ui-grid/ui-grid',
        'moment': '../lib/moment/moment',


        /**
         * app files used by the app that have been excluded in karma.conf
         */
        //MODULES
        'app': '../app/appModule',
        'loginModule': '../app/components/login/loginModule',
        'homeModule': '../app/components/home/homeModule',
        'layoutModule': '../app/components/layout/layoutModule',
        'todoModule': '../app/components/todo/todoModule',
        'contactsModule': '../app/components/contact/contactsModule',
        'projectModule': '../app/components/project/projectModule',

        //CONTROLLERS
        'loginController': '../app/components/login/loginController',
        'homeController': '../app/components/home/homeController',
        'todoController': '../app/components/todo/todoController',
        'contactsListController': '../app/components/contact/contactsListController',
        'projectsListController': '../app/components/project/projectsListController',
        'issuesListController': '../app/components/issue/issuesListController',
        'tagListController': '../app/components/administration/tag/tagListController',
        'tagItemController': '../app/components/administration/tag/tagItemController',

        //SERVICES
        'apiService': '../app/api/apiService',
        'todoService': '../app/api/todoService',
        'projectsService': '../app/api/projectsService',
        'authService': '../app/api/authService',
        'contactService': '../app/api/contactService',
        'issueService': '../app/api/issueService',
        'tagService': '../app/api/tagService',
        'milestoneService': '../app/api/milestoneService',
        'effortService': '../app/api/effortService'
    },

    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']},
        'angular-animate': {deps: ['angular']},
        'angular-mocks': {deps: ['angular']},
        'angular-resource': {deps: ['angular']},
        'angular-cookies': {deps: ['angular']},
        'angular-sanitize': {deps: ['angular']},
        'angular-bootstrap': {deps: ['angular']},
        'angular-ui-router': {deps: ['angular']},
        'jquery-ui': {deps: ['jquery']},
        'ngRoute': {deps: ['angular']},
        'angular-couch-potato': {deps: ['angular']},
        'socket.io': {deps: ['angular']},
        'anim-in-out': {deps: ['angular-animate']},
        'select2': {deps: ['jquery']},
        'summernote': {deps: ['jquery']},
        'bootstrap-validator': {deps: ['jquery']},
        'bootstrap': {deps: ['jquery']},
        'modules-includes': {deps: ['angular']},
        'ui.grid': {deps: ['angular']},
        'ngStorage': {deps: ['angular']},
        'checklist-model': {deps: ['angular']},
        'smartNotification': {deps: ['jquery']}
    },

    deps: tests,

    callback: window.__karma__.start
});
