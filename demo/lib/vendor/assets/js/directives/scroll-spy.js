define(['appModule'], function (module) {
  "use strict";

  return module.directive('scrollSpy', ['$window', function ($window) {
    return {
      link: function (scope, element, attrs) {
        angular.element($window).bind('scroll', function () {
          scope.scroll = this.pageYOffset;
          if (!scope.$$phase) {
            scope.$apply();
          }
        });
      }
    };
  }]);
})
