/**
 * Created by ivana on 02.07.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('tagService', function (apiService) {

        return {

            'getTagList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/tags'
                })
            },

            'createTag': function (tag) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/tags',
                    'data': tag
                })
            },

            'getTag': function (id) {
                return apiService.request({
                    'method': 'GET',
                    'url': '/tags/' + id
                })
            },

            'editTag': function (id, tag) {
                return apiService.request({
                    'method': 'PUT',
                    'url': '/tags/' + id,
                    data: tag
                })
            },

            'deleteTag': function (id) {
                return apiService.request({
                    'method': 'DELETE',
                    'url': '/tags/' + id
                })
            }
        }
    })
})
;
