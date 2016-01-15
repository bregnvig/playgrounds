module playgrounds.feature.map {
  'use strict';

  import IRouteParamsService = angular.route.IRouteParamsService;

  import Coordinate = playgrounds.common.model.Coordinate;
  import ICoordinate = playgrounds.common.model.ICoordinate;
  import IPlayground = playgrounds.common.model.IPlayground;
  import IPlaygroundService = playgrounds.common.service.IPlaygroundService;
  import ILocationService = playgrounds.common.service.ILocationService;

  interface IMapMarker extends ICoordinate {
    message?: string;
  }

  interface IMapCenter extends ICoordinate {
    zoom?: number;
  }

  export interface IMarker {
    [key: string]: IMapMarker;
  }

  interface IMapScope {
    filterText: IFilterText;
    markers: IMarker;
    playgroundCenter: ICoordinate;
    playgrounds: IPlayground[];
    selectedPlayground: IPlayground;
  }

  class MapMarker extends Coordinate implements IMapMarker {
    constructor(coordinates: ICoordinate, public message = '') {
      super(coordinates.lat, coordinates.lng);
    }
  }

  class MapCenter extends Coordinate implements IMapCenter {
    constructor(coordinates: ICoordinate, public zoom = 17) {
      super(coordinates.lat, coordinates.lng);
    }
  }

  class MapCtrl implements IMapScope {

    public static $inject = ['$routeParams', 'playgroundService', 'location', 'filterText'];

    public playgrounds: IPlayground[];
    public selectedPlayground: IPlayground;
    public markers: IMarker = {};
    public playgroundCenter: ICoordinate = new MapCenter(new Coordinate(56.360029, 10.746635), 8);

    constructor(private $routeParams: IRouteParamsService, playgroundService: IPlaygroundService, location: ILocationService, public filterText: IFilterText) {
      playgroundService.playgrounds().then((playgrounds) => {
        this.playgrounds = playgrounds;
      });
      if ($routeParams['id']) {
        playgroundService.find($routeParams['id']).then((playground) => {
          this.selectedPlayground = playground;
          this.markers['playground'] = new MapMarker(playground.position, playground.navn);
          this.playgroundCenter = new MapCenter(playground.position);
        });
      }
      location.get().then((coordinates) => {
        this.markers['meMarker'] = new MapMarker(coordinates, 'Her er jeg');
      });
    }

  }

  angular.module('playgrounds')
    .controller('MapCtrl', MapCtrl);


}
