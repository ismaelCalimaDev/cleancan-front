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
export interface StripeKeysResponse {
  status: boolean;
  setup_secret: string;
  customer_id: string;
  ephemeral_key: EphemeralKey;
}
export interface EphemeralKey{
  id: string;
  secret: string;
}
export interface CheckResponse {
  success: boolean;
  charge_succeeded: boolean
}
