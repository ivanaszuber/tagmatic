/**
 * Created by ivana on 28.06.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('todoService', function (apiService) {

        return {

            'getToDoList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/todos'
                })
            },

            'getToDo': function (id) {
                return apiService.request({
                    'method': 'GET',
                    'url': '/todos/' + id
                })
            },

            'createToDo': function (todo) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/todos',
                    'data': todo
                })
            },

            'deleteCompleted': function () {
                return apiService.request({
                    'method': 'DELETE',
                    'url': '/todos'
                })
            },

            'completeToDo': function (id, todo) {
                if (todo.is_complete) {
                    return apiService.request({
                        'method': 'PUT',
                        'url': '/todos/' + id,
                        data: todo
                    })
                } else {
                    return apiService.request({
                        'method': 'PUT',
                        'url': '/todos/' + id,
                        data: {
                            'id': id,
                            'is_complete': '',
                            'text': todo.text
                        }
                    })
                }

            }


        }
    })
})
;
