import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions} from "angular2/http";
import {Observable} from "rxjs/Observable";

export interface IReview {
  identifier?: number;
  rating?: number;
  comment?: string;
}

export interface IReviewService {
  reviews: Observable<IReview[]>;
  create(review: IReview): Observable<boolean>
}

class ReviewService implements IReviewService {

  private _url: string;
  private _reviews: Observable<IReview[]>;

  constructor(id: string, private _http: Http, private _options: RequestOptions) {
    this._url = `https://ratr-2015.appspot.com/location//${id}/rating`;
    this._reviews = this._http.get(this._url, this._options).map(response => response.json());
  }

  public get reviews(): Observable<IReview[]> {
    return this._reviews;
  }

  public create(review: IReview): Observable<boolean> {
    return this._http.post(this._url, JSON.stringify(review), this._options)
      .map(response => response.ok);
  }

}


@Injectable()
export class ReviewServiceFactory {

  static URL = '';

  private _options: RequestOptions;

  constructor(private _http: Http) {
    let headers = new Headers({'Accept': 'application/json'});
    headers.append('Content-Type', 'application/json');
    this._options = new RequestOptions({headers});
  }

  public newInstance(id: string): IReviewService {
    return new ReviewService(id, this._http, this._options);
  }
}