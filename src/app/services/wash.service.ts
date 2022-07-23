import { Injectable } from '@angular/core';
import { Api } from "./api.service";
import { WashesResponse } from "../models/wash.model";

@Injectable({
  providedIn: 'root'
})
export class WashService extends Api {
  public getWashes() {
    return this.get<WashesResponse>('/products')
  }
}
