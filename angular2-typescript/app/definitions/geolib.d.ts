import {ICoordinate} from "../model/playground";

declare module geolib {
  function getDistance(coordinate1: ICoordinate, coordinate2: ICoordinate): number;
}
