import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Playground, Summary } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { Center, LeafletComponent, Marker } from '../leaflet';
import { Observable, Subscription } from 'rxjs';

/* tslint:disable:component-selector-name */
@Component({
  selector: 'app-details.pane-container',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public playground: Playground;
  public summary: Summary;

  private subscriptions: Subscription[] = [];

  @ViewChild(LeafletComponent) private leaflet: LeafletComponent;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.data.subscribe((data: {summary: Summary, playground: Playground}) => {
      this.summary = data.summary;
      this.playground = data.playground;
      this.leaflet.center = new Center(this.playground.position.lat, this.playground.position.lng, 17);
      this.leaflet.markers = Observable.of(new Marker('playground', this.playground.position.lat, this.playground.position.lng));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
