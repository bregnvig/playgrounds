import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishLast';

import { Playground } from './playground';
import { environment } from '../../environments/environment';

interface IOpenDataGeometry {
  coordinates: [number[]];
}

interface IOpenDataProperties {
  id: number;
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

@Injectable()
export class PlaygroundService {

  private _requestStream: Observable<Playground[]>;

  constructor(private http: Http) {
    this._requestStream = this.http.get(environment.playgroundURL)
      .map(response => {
        const opendata: IOpenData = response.json();
        return opendata.features.map(openPlayground => {
          return {
            'id': openPlayground.properties.id,
            'name': openPlayground.properties.navn,
            'addressDescription': openPlayground.properties.adressebeskrivelse,
            'description': openPlayground.properties.beskrivelse,
            'position': {
              'lat': openPlayground.geometry.coordinates[0][1],
              'lng': openPlayground.geometry.coordinates[0][0]
            }
          };
        });
      })
      .publishLast()
      .refCount()
      .catch((error: Response) => {
        console.error('Unable to fetch playgrounds', error.statusText);
        return Observable.of([]);
      });
  }

  public getPlaygrounds(): Observable<Playground[]> {
    return this._requestStream;
  }

  public find(id: string): Observable<Playground> {
    return this._requestStream.map(playgrounds => {
      const result = playgrounds.filter(playground => playground.id === +id);
      return result.length ? result[0] : null;
    });
  }
}
