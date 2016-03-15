'use strict';

/**
 * @ngdoc function
 * @name futisveikkausApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the futisveikkausApp
 */
angular.module('futisveikkausApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('http://localhost:3002/matches').success(function(data) {
      $scope.matches = data;
    });

    var request = $http({
        method: 'get',
        url: 'http://localhost:3002/users'
      });

      request.success(
        function(data) {
          $scope.users = data;
        }
      );

    $http.get('http://localhost:3002/tournaments').success(function(data) {
      $scope.tournaments = data;
    });

    //GET USER
    $http.get('http://localhost:3002/users').success(function(data) {
      $scope.user = data[0];
    });


    $scope.selectedUser = null;
    $scope.selectedTournament = null;

    //Create User
    $scope.createUser = function (name) {
      var user = {name: name, email: name, password: name};
      var request = $http({
        method: 'post',
        url: 'http://localhost:3002/users',
        data: user
      });

      request.success(
        function(response) {
          $scope.response = response;
        }
      );
    };

    //Create Tournament
    $scope.createTournament = function () {
      console.log('hello', $scope.selectedUser);
      if ($scope.selectedUser !== null) {
        var tournament = {
          name: $scope.tname,
          owner: $scope.selectedUser,
          game_modes: {
            goals: true,
            mark: true,
            eighth_finals: false,
            quater_finals: false,
            semi_finals: false,
            finals: false,
            winner: false
          },
          points: {
          goals: 1,
          mark: 2,
          extra: 1,
          eighth_finals: 0,
          quater_finals: 0,
          semi_finals: 0,
          finals: 0,
          winner: 0
          }
        };
        var request = $http({
          method: 'post',
          url: 'http://localhost:3002/tournaments',
          data: tournament
        });

        request.success(
          function(response) {
            $scope.response = response;
          }
        );
      }
    };


    //GET TOURNAMENT
    $http.get('http://localhost:3002/tournaments').success(function(data) {
      $scope.tournament = data[0];
    });

    //Create Tournament
    $scope.inviteUser = function () {
      if ($scope.selectedTournament !== null) {
        var invite = {
          tournament_id: $scope.selectedTournament,
          user_email: $scope.useremail
        };
        var request = $http({
          method: 'put',
          url: 'http://localhost:3002/tournaments/invite-user',
          data: invite
        });

        request.success(
          function(response) {
            $scope.response = response;
          }
        );
      }
    };
  });
