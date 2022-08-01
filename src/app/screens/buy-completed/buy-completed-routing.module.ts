import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyCompletedPage } from './buy-completed.page';

const routes: Routes = [
  {
    path: '',
    component: BuyCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyCompletedPageRoutingModule {}
