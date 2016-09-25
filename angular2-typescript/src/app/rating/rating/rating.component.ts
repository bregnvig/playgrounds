import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {

  @Input() rating: number;
  @Input() readonly: boolean;

  @Output() public onChange = new EventEmitter<number>();

  ratingChanged(rating: number) {
    this.rating = rating;
    this.onChange.emit(rating);
  }
}
