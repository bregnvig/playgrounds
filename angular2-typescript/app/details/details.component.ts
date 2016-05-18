import {Component, OnInit} from 'angular2/core'
import {RouteParams, RouterLink} from "angular2/router";
import {PlaygroundService} from "../services/playgrounds";
import {IPlayground} from "../model/playground";
import {PlaygroundRatingComponent} from "../common/playground-rating";
import {RatingComponent} from "../common/rating.component";
import {ReviewComponent} from "./review.component";
import {IReview, ReviewServiceFactory, IReviewService} from "../services/review.service";
import {IMarkers, LeafletComponent} from "../map/map.component";

@Component({
  selector: 'playground-details',
  templateUrl: `app/details/details.tmpl.html`,
  directives: [PlaygroundRatingComponent, RouterLink, RatingComponent, ReviewComponent, LeafletComponent],
  styles: [
    `leaflet {
        height: calc(100vh - 50%)
    }`
  ]

})

export class PlaygroundDetailsComponent implements OnInit {

  public service: IReviewService;
  public playground: IPlayground;
  public model: IReview = {};
  public markers: IMarkers = {};

  constructor(private _routeParams: RouteParams, private _playgroundService: PlaygroundService, private _reviewServiceFactory: ReviewServiceFactory) {
  }

  public ngOnInit() {
    this._playgroundService.find(this._routeParams.get('id')).subscribe(playground => {
      this.playground = playground;
      if (playground) {
        this.markers['playground'] = playground.position;
      }
    });
    this.createReviewService();
  }

  public createReview() {
    this.service.create(this.model)
      .subscribe(() => {
        this.model = {};
        this.createReviewService();
      });
  }

  private createReviewService():IReviewService {
    return this.service = this._reviewServiceFactory.newInstance(this._routeParams.get('id'));
  }

}