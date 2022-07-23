import { Injectable } from '@angular/core';
import { Api } from "./api.service";
import {LocationResponse} from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationService extends Api {

  public getUserLocations() {
    return this.get<LocationResponse>('/locations');
  }
  public createNewLocation(location) {
    return this.post<LocationResponse>('/create/location', location)
  }
  public editLocation(location, id) {
    return this.put<LocationResponse>('/edit/location/' + id, location)
  }
  public deleteLocations(id) {
    return this.delete<LocationResponse>('/delete/location/'+ id);
  }
}
