import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Playground, PlaygroundService, Rating, Summary } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Center, LeafletComponent, Marker } from '../leaflet';
import { Observable } from 'rxjs/Observable';

/* tslint:disable:component-selector-name */
@Component({
  selector: 'app-details.pane-container',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public playground: Playground;
  public summary: Summary;
  public rating: number;

  private subscriptions: Subscription[] = [];

  @ViewChild(LeafletComponent) private leaflet: LeafletComponent;

  constructor(private playgroundService: PlaygroundService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params
      .map((data: {id: string}) => data.id)
      .mergeMap(id => this.playgroundService.find(id))
      .subscribe((playground: Playground) => {
        this.playground = playground;
        this.leaflet.center = new Center(playground.position.lat, playground.position.lng, 17);
        this.leaflet.markers = Observable.of(new Marker('playground', playground.position.lat, playground.position.lng));
      }));
    this.subscriptions.push(this.route.data.subscribe((data: {summary: Summary}) => this.summary = data.summary));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public createRating(rating: Rating) {
    rating.rating = this.rating;
    this.summary.addRating(rating);
  }

}
