import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../../services/location.service";
import {LoadingService} from "../../services/loading.service";
import {ActionSheetController} from "@ionic/angular";
import {Location} from "../../models/location.model";


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() location
  @Output() locations = new EventEmitter<Location []>()
  public displayModal
  public credentials: FormGroup

  constructor(
    private locationService: LocationService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private actionSheetController: ActionSheetController,
  ) {}

  ngOnInit() {
    this.setCredentials();
  }
  private setCredentials() {
    this.credentials = this.fb.group({
      type: [this.location.type,[Validators.required]],
      province: [this.location.province, [Validators.required]],
      postal_code: [this.location.postal_code, [Validators.required]],
      street: [this.location.street, [Validators.required]]
    })
  }
  public openModal() {
    this.displayModal = true
  }
  public closeModal() {
    this.displayModal = false
  }
  public editLocation() {
    this.loadingService.presentLoading('Modificando ubicación')
    this.locationService.editLocation(this.credentials.value, this.location.id).subscribe(response => {
      this.location = response.locations[0]
      this.closeModal()
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea eliminar dicha ubicación?',
      buttons: [{
        text: 'Sí',
        handler: () => {
          this.loadingService.presentLoading('Eliminando ubicación')
          this.locationService.deleteLocations(this.location.id).subscribe(response => {
            this.locations.emit(response.locations)
            this.loadingService.dismiss()
          }, error => {
            this.loadingService.dismiss()
          })
        }
      }, {
        text: 'No',
        handler: () => {
          console.log('No Delete clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
