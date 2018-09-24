import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy {

  public showSpinners = true;
  private sub: any;
  private news: any;

  constructor(public db: DatabaseService,
    public location: Location) { }

  ngOnInit() {
    this.showSpinners = true;
    this.sub = this.db.queryCollection('News').subscribe( data => {
      this.news = data;
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
