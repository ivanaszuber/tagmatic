/**
 * Created by ivana on 28.06.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('todoItemController', function ($scope, $state, todoService) {

        $scope.toDo = {};

        $scope.isComplete = function () {
            todoService.completeToDo($scope.todo.id, $scope.todo)
        };

        $scope.getTodo = function (id) {
            todoService.getToDo(id).then(function (todo) {
                $scope.toDo = todo;
            })
        }
    })
});