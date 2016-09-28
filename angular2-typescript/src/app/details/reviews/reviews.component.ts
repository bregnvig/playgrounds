import { Component, Input } from '@angular/core';
import { Summary } from '../../shared';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent  {

  @Input() summary: Summary;

}
