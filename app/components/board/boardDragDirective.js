/**
 * Created by ivana on 05.07.15..
 */

define(['appModule'], function (module) {
    "use strict";

    return module.registerDirective('boardDrag', function boardDrag() {

        return {
            link: function ($scope, element, attrs) {

                var dragData = "";
                $scope.$watch(attrs.boardDrag, function (newValue) {
                    dragData = newValue;
                });

                element.bind('dragstart', function (event) {
                    event.originalEvent.dataTransfer.setData("Text", JSON.stringify(dragData));
                });
            }
        };
    })
});
