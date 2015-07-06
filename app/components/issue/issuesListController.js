/**
 * Created by ivana on 02.07.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('issuesListController', function ($scope, $state, projectsService, issueService, $modal, $rootScope, columnService,
                                                                effortService, tagService, milestoneService, contactService) {

        $scope.issues = [];
        $scope.selected = [];
        $scope.showColumn = true;

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
                },
                {
                    field: 'id',
                    displayName: '',
                    cellTemplate: 'deleteButton.html',
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
                    $scope.showColumn = true;

                    projectsService.getProjectList().then(function (data) {
                        $scope.projects = data;
                    });

                    columnService.getColumnList().then(function (data) {
                        $scope.columns = data;
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

        $rootScope.deleteIssue = function (id) {
            issueService.getIssue(id)
                .then(function (issue) {
                    $scope.issue = issue;
                    issueService.deleteIssue(id).then(function (data) {
                        $scope.issues = data;
                        $rootScope.refreshBoard();
                    })
                });
        };

        $scope.getIssues();

    })
});