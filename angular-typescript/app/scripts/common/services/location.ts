module playgrounds.common.service {

  'use strict';

  export interface ILocationService {
    get(): angular.IPromise<playgrounds.common.model.ICoordinate>;
  }

  class LocationService implements ILocationService {

    private promise: angular.IPromise<playgrounds.common.model.ICoordinate>;

    constructor(private $window: angular.IWindowService, private $q: angular.IQService) {
      this.promise = $q((resolve, reject) => {
        $window.navigator.geolocation.getCurrentPosition((position) => {
          console.log('Got current position', position.coords);
          resolve(new playgrounds.common.model.Coordinate(position.coords.latitude, position.coords.longitude));
        }, () => {
          reject('Unable to get current position');
        });
      });
    }

    public get(): angular.IPromise<playgrounds.common.model.ICoordinate> {
      return this.promise;
    }

    public static factory() {
      const service = ($window: angular.IWindowService, $q: angular.IQService) => {
        return new LocationService($window, $q);
      };
      service.$inject = ['$window', '$q'];
      return service;
    }

  }

  angular.module('playgrounds')
    .factory('location', LocationService.factory());

}
