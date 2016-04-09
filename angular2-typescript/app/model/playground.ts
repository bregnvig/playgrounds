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
