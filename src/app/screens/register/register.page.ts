import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CleancanToastService} from "../../services/cleancan-toast.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public credentials: FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cleancanToastservice: CleancanToastService
  ) {
    this.credentials = this.fb.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[A-Z]/  ),
        Validators.pattern(/[0-9].*[0-9]/)]],
      password_confirmation: ['', [Validators.required]],
      phone_number: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  public register() {
    this.authService.register(this.credentials.value).subscribe(response =>{
      console.log(response);
    }, error => {
      this.cleancanToastservice.displayToast('Ha ocurrido un error en el proceso de registro.')
    });
  }

}
