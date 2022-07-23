import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WashDetailPageRoutingModule } from './wash-detail-routing.module';

import { WashDetailPage } from './wash-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WashDetailPageRoutingModule
  ],
  declarations: [WashDetailPage]
})
export class WashDetailPageModule {}
