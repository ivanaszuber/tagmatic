/**
 * Created by ivana on 28.06.15..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('todoController', function ($scope, $state, todoService) {

        $scope.toDos = [];

        $scope.filters = ['All', 'Active', 'Completed'];

        $scope.activeFilter = 'All';

        $scope.isActive = function (filter) {
            return $scope.activeFilter == filter;
        };

        $scope.setFilter = function (filter) {

            $scope.activeFilter = filter;

            if (filter != 'All') {
                todoService.getToDoList()
                    .then(function (todos) {
                        $scope.toDos = _.pluck(_.where(todos, {'status': filter}));
                    });

            } else {
                todoService.getToDoList()
                    .then(function (todos) {
                        $scope.toDos = todos
                    });

            }
        };


        $scope.createToDo = function () {

            todoService.createToDo($scope.todo).then(function () {
                $scope.todo = '';
                $scope.setFilter('All');
            });
        };

        $scope.delete = function () {
            todoService.deleteCompleted().then(function (data) {
                $scope.toDos = data;
            })
        }

        $scope.setFilter('All');
    })
});