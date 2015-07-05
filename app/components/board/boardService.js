/**
 * Created by ivana on 05.07.15..
 */
define(['components/board/boardModule'], function (module) {
    "use strict";

    return module.registerFactory('boardService', function (columnService, $q) {

        var getColumns = function () {
            return columnService.getColumnList().then(function (response) {
                return response.data;
            }, function (error) {
                return $q.reject(error.data.Message);
            });
        };

        var canMoveTask = function (sourceColId, targetColId) {
            return sourceColId == (targetColId - 1);
        };


        return {
            initialize: initialize,
            getColumns: getColumns,
            canMoveTask: canMoveTask
        };
    });

});
