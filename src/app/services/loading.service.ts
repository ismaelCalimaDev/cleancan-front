import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController,
  ) { }
  public dismiss() {
    this.loadingController.dismiss();
  }
  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
      spinner: 'bubbles'
    });
    await loading.present();
  }
}
