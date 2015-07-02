/**
 * Created by ivana on 02.07.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('issuesListController', function ($scope, $state, projectsService, issuesService, $modal, $rootScope) {

        $scope.issues = [];
        $scope.selected = [];

        $scope.gridIssues = {
            columnDefs: [
                {field: 'id', displayName: 'ID'},
                {field: 'title', displayName: 'Title'},
                {field: 'description', displayName: 'Description'},
                {field: 'getProjectName()', displayName: 'Project'}
            ],
            data: 'issues',
            multiSelect: true,
            enableColumnMenu: false,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false
        };


        $rootScope.getIssues = function () {
            $scope.issues = [];
            issuesService.getIssueList().then(function (issues) {
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

        $scope.getProjects();

    })
});