import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {ActionSheetController} from "@ionic/angular";
import {Car} from "../../models/car.model";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  @Input() car
  @Output() cars = new EventEmitter<Car []>()
  public displayModal
  public credentials: FormGroup

  constructor(
    private carService: CarService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private actionSheetController: ActionSheetController,
  ) {}

  ngOnInit() {
    this.setCredentials();
  }
  private setCredentials() {
    this.credentials = this.fb.group({
      brand: [this.car.brand,[Validators.required]],
      model: [this.car.model, [Validators.required]],
      plate: [this.car.plate, [Validators.required]],
      color: [this.car.color, [Validators.required]]
    })
  }
  public openModal() {
    this.displayModal = true
  }
  public closeModal() {
    this.displayModal = false
  }
  public editCar() {
    this.loadingService.presentLoading('Editando coche')
    this.carService.editCar(this.credentials.value, this.car.id).subscribe(response => {
      this.car = response.cars[0]
      this.closeModal()
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea eliminar dicho coche?',
      buttons: [{
        text: 'Sí',
        handler: () => {
          this.loadingService.presentLoading('Eliminando coche')
          this.carService.deleteCars(this.car.id).subscribe(response => {
            this.cars.emit(response.cars)
            this.loadingService.dismiss()
          }, error => {
            this.loadingService.dismiss()
          })
        }
      }, {
        text: 'No',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }

}
