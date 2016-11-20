import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Summary, Rating, PlaygroundService, Coordinate, Playground } from './';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import 'rxjs/operator/filter';

interface IRatrSummary {
  identifier: number;
  lat: number;
  lng: number;
  averageRating?: number;
}

const OPTIONS = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

class HttpSummary implements Summary {

  private $add = new Subject<Rating>();
  private $request: Observable<Rating[]>;

  constructor(private http: Http, private id: number, public position: Coordinate, public averageRating: number) {

    this.$request = this.$add.asObservable()
      .startWith(null)
      .flatMap(rating => {
        return (rating ?
          this.http.post(`${environment.ratingURL}/location/${this.id}/rating`, rating, OPTIONS)
            .flatMap(() => this.http.get(`${environment.ratingURL}/location/${id}`))
            .map(response => response.json())
            .map(summary => this.averageRating = summary.averageRating)
          : Observable.of(Observable.empty()));
      })
      .flatMap(() => this.http.get(`${environment.ratingURL}/location/${this.id}/rating`))
      .map(response => response.json())
      .share();
  }

  getRatings(): Observable <Rating[]> {
    return this.$request;
  }

  addRating(rating: Rating): void {
    this.$add.next(rating);
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
          .flatMap((playground: Playground) => {
            const payload = {
              identifier: playground.id,
              lat: playground.position.lat,
              lng: playground.position.lng,
            };
            return this.http.post(`${environment.ratingURL}/location`, payload, OPTIONS);
          })
          .flatMap(() => this.http.get(`${environment.ratingURL}/location/${id}`))
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
