'use strict';

angular.module('futisveikkausApp')
  .controller('LoginCtrl', function ($scope, $http, $location, auth) {

    $scope.loginUser = function () {
      auth.login($scope.email, $scope.password);

    };

  });
