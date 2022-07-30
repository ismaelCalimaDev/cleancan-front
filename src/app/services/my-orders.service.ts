import { Injectable } from '@angular/core';
import {Api} from "./api.service";
import {MyOrdersResponse, StripeKeysResponse} from "../models/my-orders.model";

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService extends Api {
  public getStripeKeys() {
    return this.get<StripeKeysResponse>('/get/stripekeys')
  }
  public getMyOrders() {
    return this.get<MyOrdersResponse>('/my-orders')
  }
}
