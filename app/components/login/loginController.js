/**
 * Created by Ivana on 20.5.2015..
 */
define(['components/login/loginModule'], function (module) {

  "use strict";

  module.registerController('loginController', function ($scope, $state, $location, authService, $timeout) {

    $scope.model = {'email': '', 'password': ''};

    $scope.login = function () {
      $scope.errors = [];

      authService.login($scope.model.email, $scope.model.password)
          .then(function () {

            $state.go('app.home');


          }, function (data) {
            $scope.errors = data;
          });

    }
  })
});