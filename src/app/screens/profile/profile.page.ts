import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user
  public presentingElement
  public displayModal
  public credentials: FormGroup
  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.loadingService.presentLoading('Cargando perfil');
    this.authService.getProfile().subscribe(response => {
      this.user = response.user
      this.initCredentials()
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  public openModal() {
    this.displayModal = true
  }
  public closeModal(modal) {
    this.displayModal = false
  }
  public editProfile() {
    this.loadingService.presentLoading('Cargando cambios')
    this.authService.editProfile(this.credentials.value).subscribe(response =>{
      this.user = response.user
      this.loadingService.dismiss()
      this.displayModal = false
    }, error => {
      this.loadingService.dismiss()
      this.displayModal = false
    })

  }
  public initCredentials() {
    this.credentials = this.fb.group({
      name: [this.user?.name,[Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone_number: [this.user?.phone_number, [Validators.required]],
    })
  }
}
