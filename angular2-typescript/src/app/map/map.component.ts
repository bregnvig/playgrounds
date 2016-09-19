import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';


import { SidebarComponent } from '../sidebar';
import { Playground, LocationService  } from '../shared';
import { Marker, Center } from '../leaflet';

/* tslint:disable:component-selector-name */
@Component({
  selector: 'app-map.pane',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {

  public playground: Playground;
  public markers: Observable<Marker>;
  public center: Center = new Center(56.360029, 10.746635);

  @ViewChild(SidebarComponent)
  private sidebar: SidebarComponent;

  constructor(private locationService: LocationService) {

  }

  ngOnInit() {
    this.locationService.current.subscribe(location => {
      console.log('Obtained location', location);
    });
    const playgroundSelected = this.sidebar.playgroundSelected.map(playground => new Marker('playground', playground.position.lat, playground.position.lng, playground.name));
    this.markers = this.locationService.current
      .map(coordinate => new Marker('me', coordinate.lat, coordinate.lng, 'Her er jeg'))
      .merge(playgroundSelected);
  }

  public playgroundSelected(playground: Playground): void {
    this.playground = playground;
    this.center = new Center(playground.position.lat, playground.position.lng, 17);
    console.log('Playground selected', playground);
  }

}
