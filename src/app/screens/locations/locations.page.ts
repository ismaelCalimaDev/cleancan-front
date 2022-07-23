import { Component, OnInit } from '@angular/core';
import { LocationService } from "../../services/location.service";
import {LoadingService} from "../../services/loading.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {error} from "protractor";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  public locations
  public displayModal
  public credentials: FormGroup

  constructor(
    private locationService: LocationService,
    private loadingService: LoadingService,
    private fb: FormBuilder
  ) {
    this.credentials = this.fb.group({
      type: ['',[Validators.required]],
      province: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      street: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.loadingService.presentLoading('Cargando ubicaciones');
    this.locationService.getUserLocations().subscribe(response => {
      this.locations = response.locations
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  public openModal() {
    this.displayModal = true
    this.credentials = this.fb.group({
      type: ['',[Validators.required]],
      province: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      street: ['', [Validators.required]]
    })
  }
  public closeModal() {
    this.displayModal = false
  }
  public addNewLocation() {
    this.loadingService.presentLoading('Creando ubicación')
    this.locationService.createNewLocation(this.credentials.value).subscribe(response => {
      this.locations = response.locations
      this.closeModal()
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  public updateLocations($event) {
    this.locations = $event
  }

}
