import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
import { RatingResolveService } from '../shared/rating-resolve.service';
const routes: Routes = [
  {
    path: ':id',
    component: DetailsComponent,
    resolve: {
      summary: RatingResolveService,
    },
  }
];

export const routing = RouterModule.forChild(routes);
