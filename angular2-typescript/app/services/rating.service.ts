import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {ICoordinate, IPlayground} from "../model/playground";

import 'rxjs/add/operator/map'


export interface IRating extends ICoordinate {
  identifier: string;
  averageRating?: number;
}


@Injectable()
export class RatingService {

  static URL = 'https://ratr-2015.appspot.com/location';

  private _options: RequestOptions;

  constructor(private _http: Http) {
    let headers = new Headers({'Accept': 'application/json'});
    headers.append('Content-Type', 'application/json');
    this._options = new RequestOptions({headers});
  }

  private createRating(playground: IPlayground): Observable<IRating> {
    return this._http
      .post(`${RatingService.URL}`, JSON.stringify(<IRating>{
        identifier: playground.id,
        lat: playground.position.lat,
        lng: playground.position.lng
      }), this._options)
      .flatMap(() => {
        return this.getById(playground);
      });
  }

  public getById(playground: IPlayground): Observable<IRating> {
    return this._http.get(`${RatingService.URL}/${playground.id}`, this._options)
      .map(response => {
        return response.json()
      })
      .catch(() => {
        return this.createRating(playground);
      });
  }
}

