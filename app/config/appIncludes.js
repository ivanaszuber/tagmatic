/**
 * Created by ivana on 27.06.15..
 */
define([
    '../components/login/loginModule',
    '../components/login/loginController',
    '../components/home/homeModule',
    '../components/home/homeController',
    '../components/layout/layoutModule',
    '../api/apiService',
    '../api/todoService',
    '../components/todo/todoModule',
    '../components/todo/todoController',
    '../components/todo/todoItemController',
    '../components/contact/contactsModule',
    '../components/contact/contactsListController',
    '../components/project/projectModule',
    '../components/project/projectsListController',

    '../components/issue/issueModule',

    '../api/projectsService',
    '../api/authService',
    '../api/contactService',
    '../api/issueService',

    '../../lib/vendor/assets/js/directives/menu-toggle',
    '../../lib/vendor/assets/js/directives/autofocus',
    '../../lib/vendor/assets/js/directives/card-flip',
    '../../lib/vendor/assets/js/directives/menu-link',
    '../../lib/vendor/assets/js/directives/navbar-hover',
    '../../lib/vendor/assets/js/directives/navbar-search',
    '../../lib/vendor/assets/js/directives/todo-widget',
    '../../lib/vendor/assets/js/vendors/ripples',
    '../../lib/vendor/assets/js/app.filters'

])