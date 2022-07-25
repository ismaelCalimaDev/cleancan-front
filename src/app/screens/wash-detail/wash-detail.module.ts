import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WashDetailPageRoutingModule } from './wash-detail-routing.module';

import { WashDetailPage } from './wash-detail.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WashDetailPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [WashDetailPage]
})
export class WashDetailPageModule {}
