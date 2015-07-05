/**
 * Created by ivana on 05.07.15..
 */

define(['appModule'], function (module) {

    "use strict";

    module.registerController('administrationController', function ($scope, columnService) {

        $scope.columns = [];
        $scope.isLoading = false;

        $scope.refreshBoard = function refreshBoard() {
            $scope.isLoading = true;
            columnService.getColumnList()
                .then(function (data) {
                    $scope.isLoading = false;
                    $scope.columns = data;
                });
        };

        $scope.refreshBoard();
    })
});