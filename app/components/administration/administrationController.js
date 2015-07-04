/**
 * Created by ivana on 03.07.15..
 */

define(['appModule'], function (module) {

    "use strict";

    module.registerController('administrationController', function ($scope,
                                                                    $state,
                                                                    issueService,
                                                                    tagService,
                                                                    milestoneService,
                                                                    projectsService,
                                                                    effortService,
                                                                    $modal,
                                                                    $rootScope) {

        $scope.tags = [];
        $scope.milestones = [];
        $scope.efforts = [];
        $scope.tasks = [];
        $scope.filters = ['Tasks', 'Tags', 'Milestones', 'Efforts'];
        $scope.activeFilter = 'Tasks';

        $scope.isActive = function (filter) {
            return $scope.activeFilter == filter;
        };

        $rootScope.setFilter = function (filter) {

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

        $scope.createItem = function () {

            if ($scope.activeFilter == 'Tasks') {
                $modal.open({
                    templateUrl: 'components/issue/issueCreateView.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.issue = {};
                        $scope.submitted = false;

                        projectsService.getProjectList().then(function (data) {
                            $scope.projects = data;
                        });

                        $scope.newIssue = function (isValid) {

                            $scope.submitted = true;

                            if (isValid) {
                                issueService.createIssue($scope.issue).then(function () {
                                    $modalInstance.close();
                                    $rootScope.setFilter('Tasks');
                                });
                            }

                        };

                        $scope.closeModal = function () {
                            $modalInstance.close();
                        }
                    }
                });
            }

            if ($scope.activeFilter == 'Tags') {
                $modal.open({
                    templateUrl: 'components/issue/issueCreateView.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.issue = {};
                        $scope.submitted = false;

                        projectsService.getProjectList().then(function (data) {
                            $scope.projects = data;
                        });

                        $scope.newIssue = function (isValid) {

                            $scope.submitted = true;

                            if (isValid) {
                                issueService.createIssue($scope.issue).then(function () {
                                    $modalInstance.close();
                                    $rootScope.setFilter('Tasks');
                                });
                            }

                        };

                        $scope.closeModal = function () {
                            $modalInstance.close();
                        }
                    }
                });
            }

        };


        $scope.setFilter('Tasks');
    })
});