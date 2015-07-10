define(['appModule'], function (module) {
    "use strict";
    module.directive('todoWidget', ['todoService', function (todoService) {
        return {
            restrict: 'EA',
            templateUrl: 'components/todo/todoWidgetView.html',
            replace: true,
            link: function ($scope, $element) {
                //$scope.todoService = new todoService($scope);
            }
        };
    }])
});
