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

            todoService.createToDo($scope.todo).then(function () {
                $scope.todo = '';
                $scope.getToDos();
            });
        };

        $scope.isComplete = function (id) {
            todoService.getToDo(id).then(function(todo){
                $scope.todo = todo;
                if ($scope.todo.is_complete) {
                    $scope.todo.is_complete = false;
                    todoService.completeToDo(id, $scope.todo)
                    $scope.style = '';
                }
                else {
                    $scope.todo.is_complete = true;
                    todoService.completeToDo(id, $scope.todo)
                    $scope.style = 'strike';
                };
            });

        }


        $scope.getToDos();
    })
});