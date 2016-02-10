module playgrounds.common.service {

  'use strict';

  import ICoordinate = playgrounds.common.model.ICoordinate;
  import IPlayground = playgrounds.common.model.IPlayground;

  export interface IPlaygroundService {
    playgrounds(): angular.IPromise<IPlayground[]>;
    find(id: string): angular.IPromise<IPlayground>;
  }

  class Playground implements IPlayground {
    constructor(public id: string, public navn: string, public adresseBeskrivelse: string, public beskrivelse: string, public position: ICoordinate) {
    }
  }

  class PlaygroundService implements IPlaygroundService {

    public static $inject = ['$http', 'location'];

    private promise: angular.IPromise<IPlayground[]>;

    constructor($http: angular.IHttpService, location: playgrounds.common.service.ILocationService) {
      this.promise = $http.get('http://data.kk.dk/dataset/legepladser/resource/79d60521-5748-4287-a875-6d0e23fac31e/proxy', {
        cache: true,
        transformResponse: (data, headersGetter, status): IPlayground[] => {
          if (status === 200) {
            const openData: OpenData.IOpenData = <OpenData.IOpenData> JSON.parse(data);
            return openData.features.map((openPlayground) => {
              const position = new playgrounds.common.model.Coordinate(openPlayground.geometry.coordinates[1], openPlayground.geometry.coordinates[0]);
              const properties = openPlayground.properties;
              return new Playground(openPlayground.id, properties.navn, properties.adressebeskrivelse, properties.beskrivelse, position);
            });
          } else {
            console.log('Unable to fetch Copenhagen open data', status);
          }
        }
      }).then((response: angular.IHttpPromiseCallbackArg<IPlayground[]>): IPlayground[] => {
        location.get().then((currentPosition) => {
          response.data.sort((a, b) => geolib.getDistance(currentPosition, a.position) - geolib.getDistance(currentPosition, b.position));
        });
        return response.data;
      });
    }

    public playgrounds(): angular.IPromise<IPlayground[]> {
      return this.promise;
    }

    public find(id: string): angular.IPromise<IPlayground> {
      return this.playgrounds().then((playgrounds) => {
        for (let i = 0; i < playgrounds.length; i++) {
          if (playgrounds[i].id === id) {
            return playgrounds[i];
          }
        }
      });
    }
  }

  angular.module('playgrounds')
    .service('playgroundService', PlaygroundService);

}
