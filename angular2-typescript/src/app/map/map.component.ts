import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import { Playground, LocationService, Coordinate, Summary } from '../shared';
import { Marker, Center } from '../leaflet';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
export class MapComponent implements OnInit, OnDestroy {

  public playground: Playground;
  public summary: Summary;
  public markers: Observable<Marker>;
  public center: Center = new Center(56.360029, 10.746635);

  private subscription: Subscription;

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
    this.subscription = this.route.data.subscribe((data: ResolvedData) => {
      this.summary = data.summary;
      this.playground = data.playground;
      if (data.playground) {
        this.center = new Center(data.playground.position.lat, data.playground.position.lng, 16);
      }
    });

    const playgroundSelected = this.route.data
      .map((data: ResolvedData) => data.playground)
      .filter(playground => !!playground)
      .map((playground: Playground) => new Marker('playground', playground.position.lat, playground.position.lng, playground.name));
    this.markers = this.locationService.current
      .catch(() => Observable.empty())
      .filter(coordinate => !!coordinate)
      .map((coordinate: Coordinate) => new Marker('me', coordinate.lat, coordinate.lng, 'Her er jeg'))
      .merge(playgroundSelected);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public playgroundSelected(playground: Playground): void {
    this.playground = playground;
    this.center = new Center(playground.position.lat, playground.position.lng, 17);
    console.log('Playground selected', playground);
  }

}
