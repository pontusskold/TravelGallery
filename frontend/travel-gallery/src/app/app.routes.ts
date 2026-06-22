import { Routes } from '@angular/router';

import { MapPage } from './features/map/pages/map-page/map-page';
import { TripDetailsPage } from './features/trips/pages/trip-details-page/trip-details-page';
import { TripsPage } from './features/trips/pages/trips-page/trips-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'trips',
  },
  {
    path: 'trips',
    component: TripsPage,
  },
  {
    path: 'trips/:id',
    component: TripDetailsPage,
  },
  {
    path: 'map',
    component: MapPage,
  },
];
