/**
 * Created by ivana on 05.07.15..
 */

define(['appModule'], function (module) {

    "use strict";

    module.registerController('boardController', function ($scope, columnService, $modal, $rootScope) {

        $scope.columns = [];
        $scope.isLoading = false;

        $rootScope.refreshBoard = function refreshBoard() {
            $scope.isLoading = true;
            columnService.getColumnList()
                .then(function (data) {
                    $scope.isLoading = false;
                    $scope.columns = data;
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

        $scope.refreshBoard();
    })
});