/**
 * Created by ivana on 27.06.15..
 */
define(['appModule'], function (module) {

    'use strict';
    module.service('authService', function authService($q, $http, $rootScope) {

        return {

            'API_URL': 'http://localhost:5005/api/v1',
            'request': function (args) {
                args = args || {};
                var deferred = $q.defer(),
                    url = this.API_URL + args.url,
                    method = args.method || "GET",
                    params = args.params || {},
                    data = args.data || {};

                $http({
                    url: url,
                    method: method.toUpperCase(),
                    params: params,
                    data: data
                })
                    .success(angular.bind(this, function (data, status) {
                        deferred.resolve(data, status);
                    }))
                    .error(angular.bind(this, function (data, status, headers, config) {
                        console.log("error syncing with: " + url);
                        deferred.reject(data, status, headers, config);
                    }));
                return deferred.promise;
            },

            'login': function (email, password) {
                var authService = this;
                return this.request({
                    'method': "POST",
                    'url': "/sessions",
                    'data': {
                        'email': email,
                        'password': password
                    }
                }).then(function (data) {
                    $rootScope.$broadcast("authService.logged_in", data);
                });
            },

            'logout': function () {
                var authService = this;
                return this.request({
                    'method': "POST",
                    'url': "/logout"
                }).then(function () {
                    $rootScope.$broadcast("authService.logged_out");
                });
            }

        };
    })
});
