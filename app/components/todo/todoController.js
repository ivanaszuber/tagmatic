/**
 * Created by ivana on 28.06.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('todoController', function ($scope, $state, todoService) {

        $scope.toDos = [];

        $scope.getToDos = function () {
            todoService.getToDoList()
                .then(function (todos) {
                   $scope.toDos = todos
                })
        };


        $scope.createToDo = function () {

            todoService.createToDo($scope.todo);
        }


        $scope.getToDos();
    })
});