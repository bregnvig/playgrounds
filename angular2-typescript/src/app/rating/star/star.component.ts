import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: 'star.component.html',
  styleUrls: ['star.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarComponent {

  @Input() expectedRating: number;
  @Input() public readonly: boolean;
  @Output() onChange = new EventEmitter<number>();

  public ratingCSSClass: string;

  public ratingSelected() {
    if (!this.readonly) {
      this.onChange.emit(this.expectedRating);
    }
  }

  @Input() set rating(value: number) {
    const result = value - this.expectedRating;
    if (result >= 0) {
      this.ratingCSSClass = 'fa-star';
    } else if (result >= -0.5) {
      this.ratingCSSClass = 'fa-star-half-o';
    } else {
      this.ratingCSSClass = 'fa-star-o';
    }
  }
}
