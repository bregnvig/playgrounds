'use strict';

angular.module('playgrounds', ['ngRoute', 'ngResource', 'leaflet-directive'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'map.html',
        controller: 'mapsCtrl'
      })
      .when('/playground/:id', {
        templateUrl: 'map.html',
        controller: 'mapsCtrl'
      })
      .when('/details/:id', {
        templateUrl: 'details.html',
        controller: 'ratingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('mapsCtrl', function($scope, $routeParams, playgroundService, location) {

    $scope.filterText = sessionStorage.filterText;
    $scope.$on("$destroy", function() {
      sessionStorage.filterText = $scope.filterText;
    });
    $scope.markers = {};
    location.get().then(function(coordinates) {
      $scope.markers.meMarker = {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
        message: 'Her er jeg'
      };
    });
    $scope.playgroundCenter = {
      lat: 56.360029,
      lng: 10.746635,
      zoom: 8
    };
    playgroundService.playgrounds().then(function(result) {
      $scope.playgrounds = result;
    });
    if ($routeParams.id) {
      playgroundService.find($routeParams.id).then(function(playground) {
        $scope.selectedPlayground = playground;
        $scope.playgroundCenter = {
          lat: playground.position.latitude,
          lng: playground.position.longitude,
          zoom: 17
        };
        $scope.markers.playgroundMarker = {
          lat: playground.position.latitude,
          lng: playground.position.longitude,
          message: playground.navn
        };
      });
    }
  })
  .controller('ratingCtrl', function($scope, $route, $routeParams, playgroundService, Playground, Rating) {
    playgroundService.find($routeParams.id).then(function(playground) {
      $scope.playground = playground;
    });
    $scope.rating = Playground.get({ id: $routeParams.id });
    $scope.ratings = Rating.query({ id: $routeParams.id });
    $scope.createRating = function() {
      new Rating($scope.model).$save({ id: $routeParams.id }, function() {
        $scope.ratings = Rating.query({ id: $routeParams.id });
        $scope.model = {};
        $scope.review.$setUntouched();
      });
    };
  });
