/**
 * Created by ivana on 01.07.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('projectsListController', function ($scope, $state, projectsService, $modal, $rootScope) {

        $scope.projects = [];

        $scope.selected = [];

        $scope.gridProjects = {
            columnDefs: [
                {field: 'id', displayName: 'ID'},
                {field: 'name', displayName: 'Name'},
                {field: 'description', displayName: 'Description'},
                {field: 'user', displayName: 'Project Lead'},
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
            data: 'projects',
            multiSelect: true,
            enableColumnMenu: false,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false
        };

        $rootScope.getProjects = function () {
            projectsService.getProjectList()
                .then(function (projects) {
                    $scope.projects = projects;
                });
        };

        $scope.createProject = function () {
            $modal.open({
                templateUrl: 'components/project/projectCreateView.html',
                controller: function ($scope, $modalInstance) {
                    $scope.project = {};
                    $scope.submitted = false;

                    $scope.createProject = function (isValid) {

                        $scope.submitted = true;

                        if (isValid) {
                            projectsService.createProject($scope.project).then(function () {
                                $modalInstance.close();
                                $rootScope.getProjects();
                            });
                        }
                        ;

                    };

                    $scope.closeModal = function () {
                        $modalInstance.close();
                    }
                }
            });
        };

    })
});