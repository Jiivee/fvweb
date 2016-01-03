'use strict';

/**
 * @ngdoc overview
 * @name futisveikkausApp
 * @description
 * # futisveikkausApp
 *
 * Main module of the application.
 */
angular
  .module('futisveikkausApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-jwt'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/makebets', {
        templateUrl: 'views/makebets.html',
        controller: 'MakeBetsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
