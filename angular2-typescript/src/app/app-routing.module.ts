import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PlaygroundResolveService } from './shared/playground-resolve.service';
import { RatingResolveService } from './shared/rating-resolve.service';
import { MapComponent } from './map/map.component';

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
    loadChildren: 'app/details/details.module#DetailsModule'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class PlaygroundsRoutingModule { }
