import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WashesPage } from './washes.page';

const routes: Routes = [
  {
    path: '',
    component: WashesPage
  },
  {
    path: ':id',
    loadChildren: () => import('../wash-detail/wash-detail.module').then( m => m.WashDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WashesPageRoutingModule {}
