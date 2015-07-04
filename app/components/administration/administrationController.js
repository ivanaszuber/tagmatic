/**
 * Created by ivana on 03.07.15..
 */

define(['appModule'], function (module) {

    "use strict";

    module.registerController('administrationController', function ($scope, $state, issueService, tagService, milestoneService, effortService) {

        $scope.tags = [];
        $scope.milestones = [];
        $scope.efforts = [];
        $scope.tasks = [];

        $scope.filters = ['Tasks', 'Tags', 'Milestones', 'Efforts'];

        $scope.activeFilter = 'Tasks';

        $scope.isActive = function (filter) {
            return $scope.activeFilter == filter;
        };

        $scope.setFilter = function (filter) {

            $scope.activeFilter = filter;

            if (filter == 'Tasks') {
                issueService.getIssueList()
                    .then(function (tasks) {
                        $scope.tasks = tasks;
                    });
            }

            if (filter == 'Tags') {
                tagService.getTagList().then(function (tags) {
                    $scope.tags = tags;
                })
            }

            if (filter == 'Milestones') {
                milestoneService.getMilestoneList().then(function (milestones) {
                    $scope.milestones = milestones;
                })
            }

            if (filter == 'Efforts') {
                effortService.getEffortList().then(function (efforts) {
                    $scope.efforts = efforts;
                })
            }
        };


        $scope.setFilter('Tasks');
    })
});