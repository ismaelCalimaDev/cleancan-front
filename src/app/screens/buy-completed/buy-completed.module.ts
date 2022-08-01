import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyCompletedPageRoutingModule } from './buy-completed-routing.module';

import { BuyCompletedPage } from './buy-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyCompletedPageRoutingModule
  ],
  declarations: [BuyCompletedPage]
})
export class BuyCompletedPageModule {}
