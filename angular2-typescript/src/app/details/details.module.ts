import { NgModule } from '@angular/core';
import SharedModule from '../shared/shared.module';
import { DetailsComponent } from './details.component';
import { routing } from './details.routing';
import { LeafletModule } from '../leaflet';
import { FormsModule } from '@angular/forms';
import { ReviewModule } from '../rating/review.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { DetailsFormComponent } from './details-form/details-form.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    ReviewModule,
    routing,
    LeafletModule,
  ],
  declarations: [
    DetailsComponent,
    ReviewsComponent,
    DetailsFormComponent,
  ]
})
export default class DetailsModule {
}
