import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WashDetailPage } from './wash-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WashDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WashDetailPageRoutingModule {}
