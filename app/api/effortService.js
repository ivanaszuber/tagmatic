/**
 * Created by ivana on 04.07.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('effortService', function (apiService) {

        return {

            'getEffortList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/efforts'
                })
            },

            'createEffort': function (effort) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/efforts',
                    'data': effort
                })
            },

            'getEffort': function (id) {
                return apiService.request({
                    'method': 'GET',
                    'url': '/efforts/' + id
                })
            },

            'editEffort': function (id, effort) {
                return apiService.request({
                    'method': 'PUT',
                    'url': '/efforts/' + id,
                    data: effort
                })
            },

            'deleteEffort': function (id) {
                return apiService.request({
                    'method': 'DELETE',
                    'url': '/efforts/' + id
                })
            }
        }
    })
})
;
