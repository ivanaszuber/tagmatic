/**
 * Created by ivana on 03.07.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('tagItemController', function ($scope, $state, tagService) {

        $scope.tag = {};

        $scope.isSelected = function () {
            $scope.tag.is_selected = true;
        };

        $scope.getTag = function (id) {
            tagService.getTag(id).then(function (tag) {
                $scope.tag = tag;
            })
        }
    })
});