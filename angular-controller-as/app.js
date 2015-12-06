'use strict';

angular.module('playgrounds', ['ngRoute', 'ngResource', 'leaflet-directive'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'map.html',
        controller: 'MapsCtrl as mapsCtrl'
      })
      .when('/playground/:id', {
        templateUrl: 'map.html',
        controller: 'MapsCtrl as mapsCtrl'
      })
      .when('/details/:id', {
        templateUrl: 'details.html',
        controller: 'RatingCtrl as ratingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('MapsCtrl', function($scope, $routeParams, playgroundService, location) {

    var vm = this;
    vm.markers = {};
    vm.playgroundCenter = {
      'lat': 56.360029,
      'lng': 10.746635,
      'zoom': 8
    };
    vm.filterText = sessionStorage.filterText || '';

    location.get().then(function(coordinates) {
      vm.markers.meMarker = angular.extend({
        message: 'Her er jeg'
      }, coordinates);
    });

    $scope.$on("$destroy", function() {
      sessionStorage.filterText = vm.filterText;
    });

    playgroundService.playgrounds().then(function(result) {
      vm.playgrounds = result;
    });

    if ($routeParams.id) {
      playgroundService.find($routeParams.id).then(function(playground) {
        vm.selectedPlayground = playground;
        vm.playgroundCenter = angular.extend({
          zoom: 17
        }, playground.position);
        vm.markers.playgroundMarker = angular.extend({
          message: playground.navn
        }, playground.position);
      });
    }
  })
  .
  controller('RatingCtrl', function($routeParams, playgroundService, Playground, Rating) {

    var vm = this;

    playgroundService.find($routeParams.id).then(function(playground) {
      vm.playground = playground;
    });
    vm.rating = Playground.get({ id: $routeParams.id });
    vm.ratings = Rating.query({ id: $routeParams.id });
    vm.createRating = function() {
      new Rating(vm.model).$save({ id: $routeParams.id }, function() {
        vm.ratings = Rating.query({ id: $routeParams.id });
        vm.model = {};
        vm.review.$setUntouched();
      });
    };
  });
