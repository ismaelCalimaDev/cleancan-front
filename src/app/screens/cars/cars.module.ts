import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarsPageRoutingModule } from './cars-routing.module';

import { CarsPage } from './cars.page';
import {CarComponent} from "../../components/car/car.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CarsPage, CarComponent]
})
export class CarsPageModule {}
