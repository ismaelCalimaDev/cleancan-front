import { Injectable } from '@angular/core';
import {Api} from "./api.service";
import {MyOrdersResponse} from "../models/my-orders.model";

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService extends Api {
  public getMyOrders() {
    return this.get<MyOrdersResponse>('/my-orders')
  }
}
