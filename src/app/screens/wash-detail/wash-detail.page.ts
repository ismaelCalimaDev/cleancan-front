import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { WashService } from "../../services/wash.service";
import { LoadingService } from "../../services/loading.service";
import {CarService} from "../../services/car.service";
import {FormBuilder, Validators} from "@angular/forms";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-wash-detail',
  templateUrl: './wash-detail.page.html',
  styleUrls: ['./wash-detail.page.scss'],
})
export class WashDetailPage implements OnInit {
  private washId
  public wash

  public selectedCar
  public displayCarModal
  public carCredentials

  public cars

  public locations

  public selectedLocation
  public displayLocationModal
  public locationCredentials

  public dateTime
  constructor(
    private route: ActivatedRoute,
    private washService: WashService,
    private loadingService: LoadingService,
    private carService: CarService,
    private fb: FormBuilder,
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.fetchData()
  }
  public addCarButtonClicked() {
    this.openCarModal()
  }
  public openCarModal() {
    this.displayCarModal = true
    this.carCredentials = this.fb.group({
      brand: ['',[Validators.required]],
      model: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      color: ['', [Validators.required]]
    })
  }
  public closeCarModal() {
    this.displayCarModal = false
  }
  public addNewCar() {
    this.loadingService.presentLoading('Creando coche')
    this.carService.createNewCar(this.carCredentials.value).subscribe(response => {
      this.cars = response.cars
      this.closeCarModal()
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  public setSelectedCar(car) {
    this.selectedCar = car
  }
  public setSelectedLocation(location) {
    this.selectedLocation = location
  }
  public addLocationButtonClicked() {
    this.openLocationModal()
  }
  public openLocationModal() {
    this.displayLocationModal = true;
    this.locationCredentials = this.fb.group({
      type: ['',[Validators.required]],
      province: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      street: ['', [Validators.required]]
    })
  }
  public closeLocationModal() {
    this.displayLocationModal = false
  }
  public addNewLocation() {
    this.loadingService.presentLoading('Creando ubicación')
    this.locationService.createNewLocation(this.locationCredentials.value).subscribe(response => {
      this.locations = response.locations
      this.closeLocationModal()
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }

  private fetchData() {
    this.loadingService.presentLoading('Cargando lavado')
    this.route.params.subscribe(
      (params: Params) => {
        this.washId = params.id;
        this.getWashById();
      })
  }
  private getWashById() {
    this.washService.getWashById(this.washId).subscribe(response => {
      this.wash = response.products
      this.getCars()
      this.getLocations();
    }, error => {
      this.loadingService.dismiss()
    })
  }
  private getCars() {
    this.carService.getUserCars().subscribe(response => {
      this.cars = response.cars
    }, error => {
      this.loadingService.dismiss()
    })
  }
  private getLocations() {
    this.locationService.getUserLocations().subscribe(response => {
      this.locations = response.locations;
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  ionChange($event) {
    this.dateTime = $event.detail.value
  }


}
