'use strict';

angular.module('playgrounds')
  .factory('playgroundService', function($http, location) {

    var promise;

    function getPlaygrounds() {
      if (!promise) {
        promise = $http.get('http://data.kk.dk/dataset/legepladser/resource/79d60521-5748-4287-a875-6d0e23fac31e/proxy', {
          cache: true,
          transformResponse: function(data, headersGetter, status) {
            if (status === 200) {
              var openData = angular.fromJson(data);
              return openData.features.map(function(openPlayground) {
                return {
                  'id': openPlayground.id,
                  'navn': openPlayground.properties.navn,
                  'adresseBeskrivelse': openPlayground.properties.adressebeskrivelse,
                  'beskrivelse': openPlayground.properties.beskrivelse,
                  'position': {
                    'latitude': openPlayground.geometry.coordinates[0][1],
                    'longitude': openPlayground.geometry.coordinates[0][0]
                  }
                };
              });
            } else {
              console.log('Unable to fetch Copenhagen open data', status);
            }
          }
        }).then(function(response) {
          location.get().then(function(currentPosition) {
            response.data.sort(function(a, b) {
              return geolib.getDistance(currentPosition, a.position) - geolib.getDistance(currentPosition, b.position);
            });
          });
          return response.data;
        });
      }
      return promise;
    }

    return {
      playgrounds: getPlaygrounds,
      find: function(id) {
        return getPlaygrounds().then(function(playgrounds) {
          for (var i = 0; i < playgrounds.length; i++) {
            if (playgrounds[i].id === id) {
              return playgrounds[i];
            }
          }
        });
      }
    };
  })
  .factory('location', function($window, $q) {
    var promise = null;

    return {
      get: function() {
        if (!promise) {
          promise = $q(function(resolve, reject) {
            $window.navigator.geolocation.getCurrentPosition(function(position) {
              console.log('Got current position', position.coords);
              resolve({
                'latitude': position.coords.latitude,
                'longitude': position.coords.longitude
              });
            }, function() {
              reject('Unable to get current position');
            });
          });
        }
        return promise;
      }
    };
  })
  .factory('Playground', function($resource) {
    return $resource('https://ratr-2015.appspot.com/location/:id');
  })
  .factory('Rating', function($resource) {
    return $resource('https://ratr-2015.appspot.com/location/:id/rating');
  });
