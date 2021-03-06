/**
 * Created by ivana on 01.07.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('projectsService', function (apiService) {

        return {

            'getProjectList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/projects'
                })
            },

            'createProject': function (project) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/projects',
                    'data': project
                })
            },

            'getProject': function (id) {
                return apiService.request({
                    'method': 'GET',
                    'url': '/projects/' + id
                })
            },

            'editProject': function (id, project) {
                return apiService.request({
                    'method': 'PUT',
                    'url': '/projects/' + id,
                    data: project
                })
            },

            'deleteProject': function (id) {
                return apiService.request({
                    'method': 'DELETE',
                    'url': '/projects/' + id
                })
            }
        }
    })
})
;
