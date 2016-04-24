import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import IOpenData = OpenData.IOpenData;
import {IPlayground} from "../model/playground";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class PlaygroundService {

  private _playgrounds: BehaviorSubject<IPlayground[]> = new BehaviorSubject(null);

  constructor(http: Http) {
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
        })
        .subscribe(playgrounds => this._playgrounds.next(playgrounds));
  }

  public get playgrounds():Observable<IPlayground[]> {
    return this._playgrounds;
  }

  public find(id:string): Observable<IPlayground> {
    return this.playgrounds
      .map(playgrounds => playgrounds ? playgrounds.find((playground) => playground.id === id) : null)
      .share();
  }


}