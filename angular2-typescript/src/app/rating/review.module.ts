import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { StarComponent } from './star/star.component';
import { ReviewComponent } from './review.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ReviewComponent,
    RatingComponent,
    StarComponent,
  ],
  exports: [
    ReviewComponent,
    RatingComponent,
  ]
})
export class ReviewModule { }
