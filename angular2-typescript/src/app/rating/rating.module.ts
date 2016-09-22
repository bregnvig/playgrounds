import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import {StarComponent} from './star/star.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RatingComponent,
    StarComponent,
  ],
  exports: [
    RatingComponent
  ]
})
export class RatingModule { }
