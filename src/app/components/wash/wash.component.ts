import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-wash',
  templateUrl: './wash.component.html',
  styleUrls: ['./wash.component.scss'],
})
export class WashComponent implements OnInit {
  @Input() wash
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}
  public redirectToWashDetail() {
    this.router.navigateByUrl('tabs/washes/' + this.wash.id)
  }

}
