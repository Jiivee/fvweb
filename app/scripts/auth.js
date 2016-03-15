'use strict';

angular.module('futisveikkausApp')
  .service('auth', function ($http, $location, $window, jwtHelper) {
    var LOCAL_TOKEN_KEY = 'futisveikkausToken';
    var userName = '';
    var userId = '';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
      var userData = jwtHelper.decodeToken(token);
      userId = userData._id;
      userName = userData.name;

      // Set the token as header for your requests!
      $http.defaults.headers.common['x-access-token'] = token;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      userName = '';
      userId = '';
      isAuthenticated = false;
      $http.defaults.headers.common['x-access-token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var login = function(email, password) {
      var userData = {
        email: email,
        password: password
      };

      var request = $http({
        method: 'post',
        url: 'http://localhost:3002/authenticate',
        data: userData
      });

      request.success(
        function(response) {
          console.log(response.user._id);
          storeUserCredentials(response.token);
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

    var logout = function() {
      destroyUserCredentials();
    };

    /*
    var isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };
    */

    loadUserCredentials();

    return {
      login: login,
      logout: logout,
      //isAuthorized: isAuthorized,
      isAuthenticated: function() {return isAuthenticated;},
      userId: function() {return userId;},
      userName: function() {return userName;}
    };

  });
