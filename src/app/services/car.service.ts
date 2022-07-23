import { Injectable } from '@angular/core';
import {Api} from "./api.service";
import {CarsResponse} from "../models/car.model";
import {LocationResponse} from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class CarService  extends Api {
  public getUserCars() {
    return this.get<CarsResponse>('/cars');
  }
  public createNewCar(car) {
    return this.post<CarsResponse>('/create/car', car)
  }
  public editCar(car, id) {
    return this.put<CarsResponse>('/edit/car/' + id, car)
  }
  public deleteCars(id) {
    return this.delete<CarsResponse>('/delete/car/'+ id);
  }
}
