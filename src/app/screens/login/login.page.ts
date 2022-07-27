import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CleancanToastService} from "../../services/cleancan-toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public credentials: FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cleanCanToastService: CleancanToastService,
    private router: Router,
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.credentials.value).subscribe(response =>{
      this.router.navigateByUrl('/tabs/washes')
    }, error => {
      this.cleanCanToastService.displayToast('Las credenciales que ha introducido no son correctas.')
    });
  }

}
