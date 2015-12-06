'use strict';

angular.module('playgrounds')
  .filter('defaultDescription', function() {
    return function(value) {
      return value || 'Ingen beskrivelse';
    };
  }).
  filter('distance', function(location) {
    var currentPosition;
    location.get().then(function(position) {
      currentPosition = position;
    });
    return function(position) {
      if (currentPosition && position.lat && position.lng) {
        return geolib.getDistance(currentPosition, position);
      }
      return 'Ukendt';
    };
  }).
  filter('humanizeDistance', function() {
    return function(distance) {
      if (!angular.isNumber(distance)) {
        return 'Ukendt';
      } else if (distance < 750) {
        return distance + ' m';
      } else if(distance < 2000) {
        return 'Et stykke vej';
      } else {
        return 'Ikke til fods!';
      }
    };
  });
