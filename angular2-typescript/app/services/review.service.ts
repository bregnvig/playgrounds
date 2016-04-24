import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions} from "angular2/http";
import {Observable} from "rxjs/Observable";

export interface IReview {
  identifier?: number;
  rating?: number;
  comment?: string;
}

@Injectable()
export class ReviewService {

  static URL = 'https://ratr-2015.appspot.com/location/';

  private _options: RequestOptions;

  constructor(private _http: Http) {
    let headers = new Headers({'Accept': 'application/json'});
    headers.append('Content-Type', 'application/json');
    this._options = new RequestOptions({headers});
  }

  public getReviews(id: string): Observable<IReview> {
    return this._http.get(ReviewService.URL + `/${id}/rating`, this._options)
      .map(response => response.json());
  }

  public createReview(id:string, review:IReview):Observable<boolean> {
    return this._http.post(ReviewService.URL + `/${id}/rating`, JSON.stringify(review), this._options)
      .map(response => response.ok);
  }

}