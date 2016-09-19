import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map';

const routes: Routes = [
    {
        path: '',
        component: MapComponent
    },
    {
        path: 'playground/:id',
        component: MapComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

export const routing = RouterModule.forRoot(routes);
