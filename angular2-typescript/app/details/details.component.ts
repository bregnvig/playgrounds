import {Component, Input, OnInit} from 'angular2/core'
import {RouteParams, RouterLink} from "angular2/router";
import {PlaygroundService} from "../services/playgrounds";
import {IPlayground} from "../model/playground";
import {PlaygroundRatingComponent} from "../footer/playground-rating";
import {RatingComponent} from "../common/rating.component";
import {ReviewComponent} from "./review.component";
import {IReview, ReviewService} from "../services/review.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'playground-details',
  templateUrl: `app/details/details.tmpl.html`,
  directives: [PlaygroundRatingComponent, RouterLink, RatingComponent, ReviewComponent]
})

export class PlaygroundDetailsComponent implements OnInit {

  public playground: IPlayground;
  public model: IReview = {};
  public reviews:Observable<IReview>;

  constructor(private _routeParams: RouteParams, private _playgroundService: PlaygroundService, private _reviewService:ReviewService) {
  }

  public
  ngOnInit() {
    this._playgroundService.find(this._routeParams.get('id')).subscribe(playground => this.playground = playground);
    this.reviews = this._reviewService.getReviews(this._routeParams.get('id'));
  }

  public createReview() {
    this._reviewService.createReview(this.playground.id, this.model)
      .subscribe(ok => {
        this.reviews = this._reviewService.getReviews(this._routeParams.get('id'));
        this.model = {};
      });
  }

}