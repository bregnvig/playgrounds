import {Component, Input, OnInit} from 'angular2/core'
import {RouteParams, RouterLink} from "angular2/router";
import {PlaygroundService} from "../services/playgrounds";
import {IPlayground} from "../model/playground";
import {PlaygroundRatingComponent} from "../footer/playground-rating";
import {RatingComponent} from "../common/rating.component";
import {ReviewComponent} from "./review.component";
import {IReview, ReviewServiceFactory, IReviewService} from "../services/review.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'playground-details',
  templateUrl: `app/details/details.tmpl.html`,
  directives: [PlaygroundRatingComponent, RouterLink, RatingComponent, ReviewComponent]
})

export class PlaygroundDetailsComponent implements OnInit {

  public service: IReviewService;
  public playground: IPlayground;
  public model: IReview = {};
  public reviews: Observable<IReview>;

  constructor(private _routeParams: RouteParams, private _playgroundService: PlaygroundService, private _reviewServiceFactory: ReviewServiceFactory) {
  }

  public
  ngOnInit() {
    this._playgroundService.find(this._routeParams.get('id')).subscribe(playground => this.playground = playground);
    this.service = this._reviewServiceFactory.newInstance(this._routeParams.get('id'));
  }

  public createReview() {
    this.service.create(this.model)
      .subscribe(() => {
        this.model = {};
      });
  }

}