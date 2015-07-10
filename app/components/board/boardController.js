/**
 * Created by ivana on 05.07.15..
 */

define(['appModule'], function (module) {

    "use strict";

    module.registerController('boardController', function ($scope, columnService, $modal, $rootScope, issueService, projectsService,
                                                           tagService, milestoneService, effortService, contactService) {

        $scope.columns = [];
        $scope.isLoading = false;

        $rootScope.refreshBoard = function refreshBoard() {
            $scope.isLoading = true;
            columnService.getColumnList()
                .then(function (data) {
                    angular.forEach(data, function(column){
                        $scope.tasks = column.tasks;
                        angular.forEach($scope.tasks, function(task){
                            tagService.getTag(task.tag_id).then(function(tag){
                                task.tag = tag;

                            });
                            contactService.getContact(task.assigned_to_id).then(function(user){
                                task.user = user
                            });
                            projectsService.getProject(task.project_id).then(function(project){
                                task.project = project;
                            });
                            milestoneService.getMilestone(task.milestone_id).then(function(milestone){
                                task.milestone = milestone;
                            });
                            effortService.getEffort(task.effort_id).then(function(effort){
                                task.effort = effort;
                            });
                            $scope.tasks=[];
                            $scope.tasks.push(task)
                            data.tasks = $scope.tasks;
                        })
                    });


                    $scope.columns = data;
                    $scope.isLoading = false;

                });
        };

        $scope.createColumn = function () {
            $modal.open({
                templateUrl: 'components/administration/column/columnCreateView.html',
                controller: function ($scope, $modalInstance) {
                    $scope.column = {};
                    $scope.submitted = false;

                    $scope.newColumn = function (isValid) {

                        $scope.submitted = true;

                        if (isValid) {
                            columnService.createColumn($scope.column).then(function () {
                                $modalInstance.close();
                                $rootScope.refreshBoard();
                            });
                        }

                    };

                    $scope.closeModal = function () {
                        $modalInstance.close();
                    }
                }
            });
        };

        $scope.deleteColumn = function (id) {
            columnService.getColumn(id)
                .then(function (column) {
                    $scope.column = column;
                    columnService.deleteColumn(id).then(function (data) {
                        $scope.columns = data;
                        $rootScope.refreshBoard();
                    })
                });
        };

        $scope.createIssue = function (column) {
            $modal.open({
                templateUrl: 'components/issue/issueCreateView.html',
                controller: function ($scope, $modalInstance) {
                    $scope.issue = {};
                    $scope.project = {};
                    $scope.tag = {};
                    $scope.milestone = {};
                    $scope.effort = {};
                    $scope.user = {};
                    $scope.submitted = false;

                    projectsService.getProjectList().then(function (data) {
                        $scope.projects = data;
                    });

                    tagService.getTagList().then(function (data) {
                        $scope.tags = data;
                    });

                    milestoneService.getMilestoneList().then(function (data) {
                        $scope.milestones = data;
                    });

                    effortService.getEffortList().then(function (data) {
                        $scope.efforts = data;
                    });

                    contactService.getContactList().then(function (data) {
                        $scope.users = data;
                    });

                    $scope.showColumn = false;

                    $scope.newIssue = function (isValid) {

                        $scope.submitted = true;

                        if (isValid) {
                            $scope.issue.column_id = column;
                            $scope.issue.project_id = $scope.project.selected.id;
                            $scope.issue.tag_id = $scope.tag.selected.id;
                            $scope.issue.milestone_id = $scope.milestone.selected.id;
                            $scope.issue.effort_id = $scope.effort.selected.id;
                            $scope.issue.assigned_to_id = $scope.user.selected.id;
                            issueService.createIssue($scope.issue).then(function () {
                                $modalInstance.close();
                                $rootScope.refreshBoard();
                            });
                        }

                    };

                    $scope.closeModal = function () {
                        $modalInstance.close();
                    }
                }
            });
        };

        $scope.onDrop = function (data, column_id) {
            issueService.getIssue(data.id).then(function (issue) {
                issue.column_id = column_id;
                issueService.editIssue(data.id, issue).then(function () {
                    $scope.refreshBoard();
                })
            })
        };

        $scope.deleteIssue = function (id) {
            issueService.getIssue(id)
                .then(function (issue) {
                    $scope.issue = issue;
                    issueService.deleteIssue(id).then(function (data) {
                        $scope.issues = data;
                        $scope.refreshBoard();
                    })
                });
        };

        $scope.refreshBoard();
    })
});