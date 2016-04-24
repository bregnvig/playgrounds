import {Component, OnInit, Input} from 'angular2/core'
import {RatingComponent} from "../common/rating.component";
import {IRating, RatingService} from "../services/rating.service";

@Component({
  selector: 'playground-rating',
  template: `<i *ngIf="!rating" class="fa fa-spinner fa-pulse"></i>
        <rating *ngIf="rating" [value]="rating.averageRating" [readOnly]="true"></rating>
    `,
  directives: [RatingComponent],
})

export class PlaygroundRatingComponent implements OnInit{

  public rating:IRating;

  public constructor(private _ratingService:RatingService) { }

  public ngOnInit() {
  }

  @Input()
  public set playground(value) {
    this.rating = null;
    if (value) {
      this._ratingService.getById(value).subscribe(rating => this.rating = rating);
    }
  }



}