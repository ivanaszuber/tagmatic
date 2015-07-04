/**
 * Created by ivana on 02.07.15..
 */

define(['../../../appModule'], function (module) {

    "use strict";

    module.registerController('tagListController', function ($scope, $state, tagService) {

        $scope.tags = [];

        tagService.getTagList()
            .then(function (tags) {
                $scope.tags = tags
            });


        $scope.createTag = function () {
            tagService.createTag($scope.tag).then(function () {
                $scope.tag = '';
            });
        };

        $scope.delete = function () {
            tagService.deleteTag().then(function (data) {
                $scope.tags = data;
            })
        }

    })
});