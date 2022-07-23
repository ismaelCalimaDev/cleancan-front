import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'locations',
    loadChildren: () => import('../locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'cars',
    loadChildren: () => import('../cars/cars.module').then( m => m.CarsPageModule)
  },
  {
    path: 'questions',
    loadChildren: () => import('../questions/questions.module').then( m => m.QuestionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
