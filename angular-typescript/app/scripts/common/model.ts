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

    public static DENMARK_CENTER = new Coordinate(56.360029, 10.746635);

    constructor(public lat: number, public lng: number) {
    }
  }

}
