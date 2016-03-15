'use strict';

angular.module('futisveikkausApp')
  .controller('MakeBetsCtrl', function ($scope, $http, auth) {

    var userUrl = 'http://localhost:3002/users/' + auth.userId();
    $http.get(userUrl).success(function(data) {
      $scope.user = data;
      $scope.bets = $scope.user.tournaments[0].match_bets;
    });

    $scope.getNumber = function(num) {
      return new Array(num);
    };

    //var notFilled = [];

    $scope.saveBets = function () {
      var request = $http({
        method: 'put',
        url: 'http://localhost:3002/matchbets',
        data: $scope.bets
      });

      request.success(
        function(response) {
          $scope.response = response;
        }
      );
    };



    $scope.randomBets = function () {
      for (var bet in $scope.bets) {
        $scope.bets[bet].score.home = Math.floor(Math.random() * 8);
        $scope.bets[bet].score.away = Math.floor(Math.random() * 8);
      }
    };
  });
