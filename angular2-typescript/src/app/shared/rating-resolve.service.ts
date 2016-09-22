import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Summary, Rating, PlaygroundService, Coordinate, Playground } from './';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

interface IRatrSummary {
  identifier: number;
  lat: number;
  lng: number;
  averageRating?: number;
}

const OPTIONS = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

class HttpSummary implements Summary {

  private ratingStream: Observable<Rating[]>;

  constructor(private http: Http, private id: number, public position: Coordinate, public averageRating: number) {
    this.ratingStream = this.http.get(`${environment.ratingURL}/location/${this.id}/rating`)
      .map(response => <Rating[]> response.json());
  }

  getRatings(): Observable <Rating[]> {
    return this.ratingStream;
  }

  addRating(rating: Rating): Observable < void > {
    return undefined;
  }

}

@Injectable()
export class RatingResolveService implements Resolve<Summary> {

  constructor(private router: Router, private http: Http, private playgroundService: PlaygroundService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Summary> {
    const id = route.params['id'];
    return this.http.get(`${environment.ratingURL}/location/${id}`)
      .catch(() => {
        return this.playgroundService.find(id.toString())
          .mergeMap((playground: Playground) => {
            const payload = {
              identifier: playground.id,
              lat: playground.position.lat,
              lng: playground.position.lng,
            };
            return this.http.post(`${environment.ratingURL}/location`, payload, OPTIONS)
          })
          .mergeMap(() => this.http.get(`${environment.ratingURL}/location/${id}`))
          .catch(() => {
            this.router.navigate(['/']);
            return Observable.throw(`No playground with id ${id} was found`);
          });
      })
      .map(response => {
        const summary: IRatrSummary = response.json();
        return new HttpSummary(this.http, id, {lat: summary.lat, lng: summary.lng}, summary.averageRating || 0);
      });
  }
}
