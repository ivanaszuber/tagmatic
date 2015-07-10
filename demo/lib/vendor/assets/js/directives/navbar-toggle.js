define(['appModule'], function (module) {
  "use strict";

  return module.directive('navbarToggle', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        element.sideNav({menuWidth: 260, closeOnClick: true});
      }
    };
  });
})
