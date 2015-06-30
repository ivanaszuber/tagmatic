/**
 * Created by ivana on 30.06.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('contactService', function (apiService) {

        return {

            'getContactList': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/contacts'
                })
            },

            'createContact': function (contact) {
                return apiService.request({
                    'method': 'POST',
                    'url': '/contacts',
                    'data': contact
                })
            },
        }
    })
})
;
