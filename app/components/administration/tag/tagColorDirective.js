/**
 * Created by Ivana on 9.7.2015..
 */

define(['appModule'], function (module) {
    "use strict";

    return module.registerDirective('tagColor', function (tagService) {

        return {
            restrict: 'A',
            link: function(scope, el, attr) {
                tagService.getTag().then(function(tag){
                    scope.bgCol = tag.color;
                });
            }
        }
    })
});
