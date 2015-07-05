/**
 * Created by ivana on 05.07.15..
 */

define(['appModule'], function (module) {

    "use strict";

    module.registerController('boardController', function ($scope, columnService, $modal, $rootScope, issueService, projectsService) {

        $scope.columns = [];
        $scope.isLoading = false;

        $rootScope.refreshBoard = function refreshBoard() {
            $scope.isLoading = true;
            columnService.getColumnList()
                .then(function (data) {
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
                    $scope.submitted = false;

                    projectsService.getProjectList().then(function (data) {
                        $scope.projects = data;
                    });

                    $scope.showColumn = false;

                    $scope.newIssue = function (isValid) {

                        $scope.submitted = true;

                        if (isValid) {
                            $scope.issue.column_id = column;
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

        $scope.refreshBoard();
    })
});