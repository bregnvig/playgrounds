import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map';
import { RatingResolveService } from './shared/rating-resolve.service';
import { PlaygroundResolveService } from './shared/playground-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'playground/:id',
    component: MapComponent,
    resolve: {
      summary: RatingResolveService,
      playground: PlaygroundResolveService,
    },
  },
  {
    path: 'details',
    loadChildren: 'app/details/details.module'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
