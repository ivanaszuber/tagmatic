/**
 * Created by ivana on 04.07.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('milestoneService', function (apiService) {

        return {

            'getMilestoneList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/milestones'
                })
            },

            'createMilestone': function (milestone) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/milestones',
                    'data': milestone
                })
            },

            'getMilestone': function (id) {
                return apiService.request({
                    'method': 'GET',
                    'url': '/milestones/' + id
                })
            },

            'editMilestone': function (id, milestone) {
                return apiService.request({
                    'method': 'PUT',
                    'url': '/milestones/' + id,
                    data: milestone
                })
            },

            'deleteMilestone': function (id) {
                return apiService.request({
                    'method': 'DELETE',
                    'url': '/milestones/' + id
                })
            }
        }
    })
})
;
