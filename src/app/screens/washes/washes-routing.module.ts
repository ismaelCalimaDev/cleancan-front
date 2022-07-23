import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WashesPage } from './washes.page';

const routes: Routes = [
  {
    path: '',
    component: WashesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WashesPageRoutingModule {}
