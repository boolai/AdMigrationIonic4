import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.page.html',
  styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit, OnDestroy {

  public appSettings: any;
  private sub: any;
  public showSpinners = true;

  constructor(public db: DatabaseService,
  public location: Location) {
  }

  ngOnInit() {
    this.sub = this.db.queryAppSettings()
    .subscribe( data => {
      this.appSettings = data;
      this.showSpinners = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public goBack() {
    this.location.back();
  }
}
