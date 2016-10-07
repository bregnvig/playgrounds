import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import { Playground, LocationService, Summary } from '../shared';
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
  public markers$: Observable<Marker>;
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
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
