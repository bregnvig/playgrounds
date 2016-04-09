import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import IOpenData = OpenData.IOpenData;
import {IPlayground} from "../model/playground";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class PlaygroundService {

  private _playgrounds: Promise<IPlayground[]>;

  constructor(http: Http) {
    this._playgrounds =
      http.get('http://data.kk.dk/dataset/legepladser/resource/79d60521-5748-4287-a875-6d0e23fac31e/proxy')
        .map(response => {
          const opendata: IOpenData = response.json();
          return opendata.features.map(openPlayground => {
            return {
              'id': openPlayground.id,
              'navn': openPlayground.properties.navn,
              'adresseBeskrivelse': openPlayground.properties.adressebeskrivelse,
              'beskrivelse': openPlayground.properties.beskrivelse,
              'position': {
                'lat': openPlayground.geometry.coordinates[1],
                'lng': openPlayground.geometry.coordinates[0]
              }
            }
          })
        }).toPromise();
  }

  public get playgrounds() {
    return this._playgrounds;
  }


}