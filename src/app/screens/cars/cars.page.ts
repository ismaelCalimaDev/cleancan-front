import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

  public cars
  public displayModal
  public credentials: FormGroup

  constructor(
    private carService: CarService,
    private loadingService: LoadingService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.loadingService.presentLoading('Cargando coches');
    this.carService.getUserCars().subscribe(response => {
      this.cars = response.cars
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  public openModal() {
    this.displayModal = true
    this.credentials = this.fb.group({
      brand: ['',[Validators.required]],
      model: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      color: ['', [Validators.required]]
    })
  }
  public closeModal() {
    this.displayModal = false
  }
  public addNewCar() {
    this.loadingService.presentLoading('Creando coche')
    this.carService.createNewCar(this.credentials.value).subscribe(response => {
      this.cars = response.cars
      this.closeModal()
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  public updateCars($event) {
    this.cars = $event
  }

}
