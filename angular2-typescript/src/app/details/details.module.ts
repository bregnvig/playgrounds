import { NgModule } from '@angular/core';
import SharedModule from '../shared/shared.module';
import { DetailsComponent } from './details.component';
import { routing } from './details.routing';
import { LeafletModule } from '../leaflet';
import { FormsModule } from '@angular/forms';
import { ReviewModule } from '../rating/review.module';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    ReviewModule,
    routing,
    LeafletModule,
  ],
  declarations: [DetailsComponent]
})
export default class DetailsModule {
}
