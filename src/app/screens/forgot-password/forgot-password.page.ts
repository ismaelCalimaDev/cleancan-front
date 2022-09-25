import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/loading.service";
import {AuthService} from "../../services/auth.service";
import {CleancanToastService} from "../../services/cleancan-toast.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public credentials: FormGroup
  public emailSent = false
  constructor (
    private fb: FormBuilder,
    private userService: AuthService,
    private toastService: CleancanToastService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit () {
  }

  public sendPasswordResetEmail () {
    this.loadingService.presentLoading('Enviando Correo')
    this.userService.sendResetPasswordEmail(this.credentials.value).subscribe(() => {
        this.emailSent = true
        this.loadingService.dismiss()
      },
      () => {
        this.toastService.displayToast('Lo sentimos. No se ha podido completar la acción.')
        this.loadingService.dismiss()
      })
  }

  public redirectToLogin () {
    this.router.navigateByUrl('/')
  }

}
