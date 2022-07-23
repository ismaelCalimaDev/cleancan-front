import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WashesPageRoutingModule } from './washes-routing.module';

import { WashesPage } from './washes.page';
import {WashComponent} from "../../components/wash/wash.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WashesPageRoutingModule
  ],
    declarations: [WashesPage, WashComponent]
})
export class WashesPageModule {}
