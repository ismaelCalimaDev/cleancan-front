import { Component, OnInit } from '@angular/core';
import {WashService} from "../../services/wash.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-washes',
  templateUrl: './washes.page.html',
  styleUrls: ['./washes.page.scss'],
})
export class WashesPage implements OnInit {
  public washes
  constructor(
    private washService: WashService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.getWashes()
  }
  private getWashes() {
    this.loadingService.presentLoading('Cargando lavados')
    this.washService.getWashes().subscribe(response => {
      this.washes = response.products
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }

}
