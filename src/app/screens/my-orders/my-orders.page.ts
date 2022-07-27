import { Component, OnInit } from '@angular/core';
import {MyOrdersService} from "../../services/my-orders.service";
import {LoadingService} from "../../services/loading.service";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  public nextWashesSelected
  public nextWashes = []
  public antiqueWashes = []
  public washes
  public selectedWashes

  constructor(
    private myOrdersService: MyOrdersService,
    private loadingService : LoadingService,
  ) { }

  ngOnInit() {
    this.nextWashesSelected = true
  }
  ionViewWillEnter() {
    this.getMyOrders();
  }
  private getMyOrders() {
    this.antiqueWashes = []
    this.nextWashes = []
    this.loadingService.presentLoading('Cargando mis lavados')
    this.myOrdersService.getMyOrders().subscribe(response => {
      this.washes = response.orders
      this.filterWashes()
    }, error => {
      this.loadingService.dismiss()
    });
  }
  private filterWashes() {
    this.washes.map((wash)=> {
      let date = dayjs(wash.date)
      if(dayjs().isBefore(date)) {
        this.nextWashes.push(wash)
      } else {
        this.antiqueWashes.push(wash)
      }
    })
    this.selectedWashes = this.nextWashes
    this.loadingService.dismiss()
  }

  public nextWashesClicked() {
    this.selectedWashes = this.nextWashes
    this.nextWashesSelected = true
  }
  public antiqueWashesClicked() {
    this.selectedWashes = this.antiqueWashes
    this.nextWashesSelected = false
  }
}
