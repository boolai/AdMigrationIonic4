import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.page.html',
  styleUrls: ['./ads-list.page.scss'],
})
export class AdsListPage implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

  public goBack() {
    this.location.back();
  }

}
