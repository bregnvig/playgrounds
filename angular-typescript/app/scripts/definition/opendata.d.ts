declare module OpenData {

  interface IOpenDataGeometry {
    coordinates: [number[]];
  }

  interface IOpenDataProperties {
    navn: string;
    adressebeskrivelse: string;
    beskrivelse: string;
  }

  interface IOpenDataPlayground {
    id: string;
    properties: IOpenDataProperties;
    geometry: IOpenDataGeometry;
  }

  interface IOpenData {
    features: IOpenDataPlayground[];
  }
}
