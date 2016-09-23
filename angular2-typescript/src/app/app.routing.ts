import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map';
import { DetailsComponent } from './details/details.component';
import { RatingResolveService } from './shared/rating-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'playground/:id',
    component: MapComponent,
    resolve: {
      summary: RatingResolveService
    },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    resolve: {
      summary: RatingResolveService
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
