/**
 * Created by ivana on 02.07.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('issuesListController', function ($scope, $state, projectsService, issueService, $modal, $rootScope) {

        $scope.issues = [];
        $scope.selected = [];

        $scope.gridIssues = {
            columnDefs: [
                {field: 'id', displayName: 'ID'},
                {field: 'title', displayName: 'Title'},
                {field: 'description', displayName: 'Description'},
                {field: 'getProjectName()', displayName: 'Project'},
                {
                    field: 'id',
                    displayName: '',
                    cellTemplate: 'editButton.html',
                    width: 40,
                    enableColumnMenu: false,
                    enableSorting: false
                },
                {
                    field: 'id',
                    displayName: '',
                    cellTemplate: 'viewButton.html',
                    width: 40,
                    enableColumnMenu: false,
                    enableSorting: false
                }
            ],
            data: 'issues',
            multiSelect: true,
            enableColumnMenu: false,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false
        };


        $rootScope.getIssues = function () {
            $scope.issues = [];
            issueService.getIssueList().then(function (issues) {
                angular.forEach(issues, function (issue) {
                    projectsService.getProject(issue.project_id).then(function (project) {
                        issue.project = project;
                        issue.getProjectName = function () {
                            return project.name;
                        };
                        $scope.issues.push(issue);
                    });
                })
            });
        };

        $scope.createIssue = function () {
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
                                $rootScope.getIssues();
                            });
                        }

                    };

                    $scope.closeModal = function () {
                        $modalInstance.close();
                    }
                }
            });
        };

        $rootScope.editIssue =
            function (id) {
                $modal.open({
                    templateUrl: 'components/issue/issueEditView.html',
                    controller: function ($scope, $modalInstance) {
                        projectsService.getProjectList().then(function (data) {
                            $scope.projects = data;
                        });

                        issueService.getIssue(id)
                            .then(function (issue) {
                                $scope.issue = issue;
                                projectsService.getProject(issue.project_id).then(function (project) {
                                    $scope.project = {};
                                    $scope.project.selected = project;

                                })
                            });

                        $scope.submitted = false;
                        $scope.edit = function (isValid) {
                            $scope.submitted = true;
                            if (isValid) {
                                $scope.issue.projectid = $scope.project.selected.id;
                                issueService.editIssue(id, $scope.issue).then(function () {
                                    $modalInstance.close();
                                    $rootScope.getIssues();
                                });
                            }
                        };

                        $scope.closeModal = function () {
                            $modalInstance.close();
                        }
                    }
                });
            };

        $rootScope.viewIssue =
            function (id) {
                $modal.open({
                    templateUrl: 'components/issue/issueViewView.html',
                    controller: function ($scope, $modalInstance) {
                        issueService.getIssue(id)
                            .then(function (issue) {
                                $scope.issue = issue;
                                projectsService.getProject(issue.project_id).then(function (project) {
                                    $scope.project = {};
                                    $scope.project.selected = project;
                                });
                            });

                        $scope.closeModal = function () {
                            $modalInstance.close();
                        }
                    }
                });
            };

        $scope.getIssues();

    })
});