import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Playground, LocationService, Coordinate, Summary } from '../shared';
import { Marker, Center } from '../leaflet';

interface ResolvedData {
  summary: Summary;
  playground: Playground;
}

/* tslint:disable:component-selector-name */
@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {

  public playground$: Observable<Playground>;
  public summary$: Observable<Summary>;
  public markers$: Observable<Marker>;
  public center: Center = new Center(56.360029, 10.746635);

  constructor(private locationService: LocationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.locationService.current
      .catch(error => {
        console.warn('Unable to obtain position', error);
        return Observable.empty();
      })
      .subscribe(location => {
        console.log('Obtained location', location);
      });
    this.summary$ = this.route.data.map((data: ResolvedData) => data.summary);
    this.playground$ = this.route.data
      .map((data: ResolvedData) => data.playground)
      .filter(playground => !!playground)
      .do(playground => this.center = new Center(playground.position.lat, playground.position.lng, 17));

    const playgroundSelected$ = this.playground$.map((playground: Playground) => new Marker('playground', playground.position.lat, playground.position.lng, playground.name));
    this.markers$ = this.locationService.current
      .catch(() => Observable.empty())
      .filter(coordinate => !!coordinate)
      .map((coordinate: Coordinate) => new Marker('me', coordinate.lat, coordinate.lng, 'Her er jeg'))
      .merge(playgroundSelected$);
  }
}
