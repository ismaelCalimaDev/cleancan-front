import {Location} from "./location.model";
import {Car} from "./car.model";
import {Wash} from "./wash.model";

export interface MyOrdersResponse {
  status: boolean
  orders: Order
}
export interface Order {
  id: string
  date: string
  location_detail: Location
  car_detail: Car
  product_detail: Wash
}
