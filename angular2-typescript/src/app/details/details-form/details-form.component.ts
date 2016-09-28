import { Component, OnInit, Input } from '@angular/core';
import { Rating, Summary } from '../../shared';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit {

  @Input() public summary: Summary;
  public score: number;

  constructor() { }

  ngOnInit() {
  }

  public createRating(rating: Rating) {
    rating.rating = this.score;
    this.summary.addRating(rating);
  }

}
