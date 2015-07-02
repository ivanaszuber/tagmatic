/**
 * Created by ivana on 02.07.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('issueService', function (apiService) {

        return {

            'getIssueList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/issues'
                })
            },

            'createIssue': function (issue) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/issues',
                    'data': issue
                })
            },

            'getIssue': function (id) {
                return apiService.request({
                    'method': 'GET',
                    'url': '/issues/' + id
                })
            },

            'editIssue': function (id, issue) {
                return apiService.request({
                    'method': 'PUT',
                    'url': '/issues/' + id,
                    data: issue
                })
            },

            'deleteIssue': function (id) {
                return apiService.request({
                    'method': 'DELETE',
                    'url': '/issues/' + id
                })
            }
        }
    })
})
;
