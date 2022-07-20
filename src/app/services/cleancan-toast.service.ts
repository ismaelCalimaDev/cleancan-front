import { Injectable } from '@angular/core';
import {ToastService} from "angular-toastify";

@Injectable({
  providedIn: 'root'
})
export class CleancanToastService {

  constructor(
    private toastService: ToastService,
  ) { }
  public displayToast(message) {
    this.toastService.info(message)
  }
}
