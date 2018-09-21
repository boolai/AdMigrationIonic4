import { Component, OnDestroy } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriesModalPage } from '../categories-modal/categories-modal.page';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy{

  ads: any;
  adSub:any;

  slideOpts = {
    effect: 'flip'
  };

  constructor(public db: DatabaseService, public modalController: ModalController,
     public navCtrl:NavController,
     public router: Router) {

      this.adSub = this.db.getAdsViaGeoPoint()
      .subscribe( data => {
        this.ads = data
      });
  }

  async presentCatModal() {
    const modal = await this.modalController.create({
      component: CategoriesModalPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.adSub.unsubscribe();
  }

  public goToPage(ad:any) {
    this.router.navigateByUrl('/ad/' + ad.id);
  }

}
