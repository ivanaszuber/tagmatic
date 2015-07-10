define(['appModule'], function (module) {
    "use strict";

    return module.directive('autofocus', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                $timeout(function () {
                    $element[0].focus();
                });
            }
        };
    }]);
});
