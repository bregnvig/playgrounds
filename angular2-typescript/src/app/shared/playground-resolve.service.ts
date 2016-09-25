import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Playground, PlaygroundService } from './';
import { Observable } from 'rxjs';

@Injectable()
export class PlaygroundResolveService implements Resolve<Playground> {

  constructor(private router: Router, private playgroundService: PlaygroundService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Playground> {
    return this.playgroundService.find(route.params['id'])
      .map((playground: Playground) => {
        if (!playground) {
          this.router.navigate(['/']);
          Observable.throw('Playground could not be found');
        }
        return playground;
      });
  }
}
