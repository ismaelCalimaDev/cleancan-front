import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { WashService } from "../../services/wash.service";
import { LoadingService } from "../../services/loading.service";

@Component({
  selector: 'app-wash-detail',
  templateUrl: './wash-detail.page.html',
  styleUrls: ['./wash-detail.page.scss'],
})
export class WashDetailPage implements OnInit {
  private washId
  public wash
  public car
  public location
  public dateTime
  constructor(
    private route: ActivatedRoute,
    private washService: WashService,
    public loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.fetchData()
  }
  private fetchData() {
    this.loadingService.presentLoading('Cargando lavado')
    this.route.params.subscribe(
      (params: Params) => {
        this.washId = params.id;
        this.getWashById();
      })
  }
  private getWashById() {
    this.washService.getWashById(this.washId).subscribe(response => {
      this.wash = response.products
      this.loadingService.dismiss()
    }, error => {
      this.loadingService.dismiss()
    })
  }
  ionChange($event) {
    this.dateTime = $event.detail.value
  }

}
