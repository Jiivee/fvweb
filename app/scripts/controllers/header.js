'use strict';

angular.module('futisveikkausApp')
  .controller('HeaderCtrl', function ($scope, $location, $window, auth) {

    $scope.authenticated = auth.isAuthenticated();
    $scope.userName = auth.userName();

    $scope.logout = function() {
      auth.logout();
      $location.path('/');
      $window.location.reload();
    };

  });
