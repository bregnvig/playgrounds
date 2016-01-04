'use strict';

/**
 * @ngdoc overview
 * @name playgroundTypescriptApp
 * @description
 * # playgroundTypescriptApp
 *
 * Main module of the application.
 */
angular
  .module('playgrounds', [
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'leaflet-directive'
  ])
  .config(function ($routeProvider: angular.route.IRouteProvider) {
    $routeProvider
      .when('/', {
        controller: 'MapCtrl as mapCtrl',
        templateUrl: 'scripts/map/map.html'
      })
      .when('/playground/:id', {
        controller: 'MapCtrl as mapCtrl',
        templateUrl: 'scripts/map/map.html'
      })
      .when('/details/:id', {
        controller: 'DetailsCtrl as detailsCtrl',
        templateUrl: 'scripts/details/details.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
