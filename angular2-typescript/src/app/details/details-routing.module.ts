import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
import { RatingResolveService } from '../shared/rating-resolve.service';
import { PlaygroundResolveService } from '../shared/playground-resolve.service';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: ':id',
    component: DetailsComponent,
    resolve: {
      summary: RatingResolveService,
      playground: PlaygroundResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DetailsRoutingModule { }
