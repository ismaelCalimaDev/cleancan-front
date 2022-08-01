import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { WashService } from "../../services/wash.service";
import { LoadingService } from "../../services/loading.service";
import {CarService} from "../../services/car.service";
import {FormBuilder, Validators} from "@angular/forms";
import {LocationService} from "../../services/location.service";
import * as dayjs from "dayjs";
import {MyOrdersService} from "../../services/my-orders.service";
import {Stripe} from "@capacitor-community/stripe";
import {CleancanToastService} from "../../services/cleancan-toast.service";

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

  public minDate
  public dateTime
  public displayCalendar
  public date
  public time

  public displayConfirmButton
  constructor(
    private route: ActivatedRoute,
    private washService: WashService,
    private loadingService: LoadingService,
    private carService: CarService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private storeService: MyOrdersService,
    public toastService: CleancanToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchData()
    this.setDate()
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
  public setDate() {
    this.minDate = dayjs().add(1,'day').format('YYYY-MM-DDTHH:mm:ss')
    this.displayCalendar = true
  }
  ionChange($event) {
    this.dateTime = $event.detail.value
    this.confirmDateTime()
  }
  public confirmDateTime() {
    this.date = dayjs(this.dateTime).format('DD-MM-YYYY')
    this.time = dayjs(this.dateTime).format('HH:mm:ss')
    this.displayCalendar = false
  }
  public isValidData() {
    return this.selectedCar && this.selectedLocation && this.dateTime && !this.displayCalendar
  }
  public buyButtonClicked() {
    this.storeService.getStripeKeys().subscribe(async response => {
      await Stripe.createPaymentFlow({
        setupIntentClientSecret: response.setup_secret,
        customerEphemeralKeySecret: response.ephemeral_key.secret,
        customerId: response.customer_id,
        merchantDisplayName: 'rdlabo',
      });
      await this.presentPaymentFlow();
      await this.confirmPaymentFlow();
      await this.checkIfOperationSucceeded();
    })
  }
  public presentPaymentFlow(){
    return Stripe.presentPaymentFlow();
  }

  public confirmPaymentFlow() {
    return Stripe.confirmPaymentFlow();
  }

  public checkIfOperationSucceeded() {
    this.loadingService.presentLoading('Comprobando datos bancarios')
    this.storeService.checkIfOperationSucceeded().subscribe(response => {
      this.loadingService.dismiss()
      if (response.charge_succeeded) {
        this.displayConfirmButton = true
      } else {
        this.toastService.displayToast('Ha ocurrido un error. Asegúrese de que los datos introducidos sean correctos')
      }
    })
  }

  public confirmBuyButtonClicked() {
    const data = {
      product_id: this.washId,
      car_id: this.selectedCar.id,
      location_id: this.selectedLocation.id,
      date: dayjs(this.dateTime).format('YYYY-MM-DD') + ' ' + this.time,
    }
    this.loadingService.presentLoading('Tramitando pedido')
    this.storeService.confirmPayment(data).subscribe(()=> {
      this.loadingService.dismiss()
      this.router.navigateByUrl('/tabs/buy-completed')
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
}
