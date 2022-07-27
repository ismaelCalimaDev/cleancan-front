import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import {LoadingService} from "../services/loading.service";
import {error} from "protractor";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loadingService.presentLoading('Cargando credenciales')
    this.authService.getProfile().subscribe(()=> {
      this.loadingService.dismiss()
      return this.router.navigateByUrl('/tabs/washes')
    }, error => {
      this.loadingService.dismiss()
    })
    return true;
  }

}
