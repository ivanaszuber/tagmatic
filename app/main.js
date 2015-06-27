/**
 * Created by ivana on 27.06.15..
 */
window.name = "NG_DEFER_BOOTSTRAP!";

define([
    'require',
    'jquery',
    'angular',
    'domReady',
    'jquery-ui',
    'bootstrap',
    'appModule',
    'config/appIncludes'
], function (require, $, ng, domReady) {
    'use strict';

    domReady(function (document) {
        ng.bootstrap(document, ['appModule'], {
            //strictDi: true
        });
        ng.resumeBootstrap();
    });
});
