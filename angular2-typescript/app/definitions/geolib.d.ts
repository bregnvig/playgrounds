interface ICoordinate {
  lat: number;
  lng: number;
}
declare namespace geolib {
  function getDistance(coordinate1: ICoordinate, coordinate2: ICoordinate): number;
}
