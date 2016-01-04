module playgrounds.common.filters {

  'use strict';

  import ILocationService = playgrounds.common.service.ILocationService;
  import ICoordinate = playgrounds.common.model.ICoordinate;

  const defaultDescription = () => {
    return (value: string): string => {
      return value || 'Ingen beskrivelse';
    };
  };

  const distance = (location: ILocationService) => {

    let currentPosition: ICoordinate;

    location.get().then((position) => {
      currentPosition = position;
    });

    return (position: ICoordinate): number|string => {
      if (currentPosition && position) {
        return geolib.getDistance(currentPosition, position);
      }
      return 'Ukendt';
    };
  };
  distance.$inject = ['location'];

  const humanizeDistance = () => {
    return (distance: number|string): string => {
      if (!angular.isNumber(distance)) {
        return 'Ukendt';
      } else if (distance < 750) {
        return distance + ' m';
      } else if (distance < 2000) {
        return 'Et stykke vej';
      }
      return 'Ikke til fods!';
    };
  };

  angular.module('playgrounds')
    .filter('defaultDescription', defaultDescription)
    .filter('distance', distance)
    .filter('humanizeDistance', humanizeDistance);
}
