/**
 * Created by ivana on 05.07.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('columnService', function (apiService) {

        return {

            'getColumnList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/columns'
                })
            },

            'createColumn': function (column) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/columns',
                    'data': column
                })
            },

            'getColumn': function (id) {
                return apiService.request({
                    'method': 'GET',
                    'url': '/columns/' + id
                })
            },

            'editColumn': function (id, column) {
                return apiService.request({
                    'method': 'PUT',
                    'url': '/columns/' + id,
                    data: column
                })
            },

            'deleteColumn': function (id) {
                return apiService.request({
                    'method': 'DELETE',
                    'url': '/columns/' + id
                })
            }
        }
    })
})
;
