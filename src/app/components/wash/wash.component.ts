import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wash',
  templateUrl: './wash.component.html',
  styleUrls: ['./wash.component.scss'],
})
export class WashComponent implements OnInit {
  @Input() wash
  constructor() { }

  ngOnInit() {}

}
