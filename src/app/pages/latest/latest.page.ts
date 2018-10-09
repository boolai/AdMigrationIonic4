import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriesModalPage } from '../categories-modal/categories-modal.page';
import { Router } from '@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.page.html',
  styleUrls: ['./latest.page.scss'],
})
export class LatestPage implements OnInit, OnDestroy {

  public ads: any;

  constructor(public db: DatabaseService,
    public modalController: ModalController,
    public navCtrl: NavController,
    public router: Router) { }

  ngOnInit() {

    this.db.getLatestWithCat();
  }

  ngOnDestroy() {
  }

  public goToPage(ad: any) {
    this.router.navigateByUrl('/ad/' + ad.id);
  }

  public goBack() {
    this.router.navigateByUrl('/home');
  }

  async presentCatModal() {
    const modal = await this.modalController.create({
      component: CategoriesModalPage,
      componentProps: { isLatest: true }
    });
    return await modal.present();
  }

}
