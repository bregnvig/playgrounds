module playgrounds.common.model {
  'use strict';

  export interface ICoordinate {
    lat: number;
    lng: number;
  }

  export interface IPlayground {
    id: string;
    navn: string;
    adresseBeskrivelse?: string;
    beskrivelse?: string;
    position: ICoordinate;
  }

  export class Coordinate implements ICoordinate {
    constructor(public lat: number, public lng: number) {
    }
  }

}
