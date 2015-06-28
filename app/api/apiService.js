/**
 * Created by ivana on 28.06.15..
 */

define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('apiService', function ($http, $q) {


        return {
            'API_URL': 'http://localhost:5000/api/v1',
            'request': function (args) {
                $http.defaults.headers.common.Authorization = 'Basic ' + 'am9obmRvZUBnbWFpbC5jb206YWRtaW4=';
                args = args || {};
                var deferred = $q.defer(),
                    url = this.API_URL + args.url,
                    method = args.method || "GET",
                    params = args.params || {},
                    data = args.data || {};

                $http({
                    url: url,
                    method: method.toUpperCase(),
                    data: data,
                    params: params
                })
                    .success(angular.bind(this, function (data, status) {
                        deferred.resolve(data, status);
                    }))
                    .error(angular.bind(this, function (data, status, headers, config) {
                        console.log("error syncing with: " + url);
                        deferred.reject(data, status, headers, config);
                    }));
                return deferred.promise;
            }
        };
    })
});
