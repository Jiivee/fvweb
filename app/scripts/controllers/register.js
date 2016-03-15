'use strict';

angular.module('futisveikkausApp')
  .controller('RegisterCtrl', function ($scope, $http, $location, $window) {

    $scope.registerUser = function () {
      var userData = {
        email: $scope.email,
        password: $scope.password,
        name: $scope.name
      };

      var request = $http({
        method: 'post',
        url: 'http://localhost:3002/register',
        data: userData
      });

      request.success(
        function(response) {
          console.log(response);
          $location.path('/');
          $window.location.reload();
        }
      )
      .error(
        function(response) {
          console.log('error ', response);
        }
      );

    };

  });
