import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriesModalPage } from '../categories-modal/categories-modal.page';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Slides } from '@ionic/angular';
/// <reference types="@types/googlemaps" />
import { MapsAPILoader } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy, OnInit, AfterViewInit {

  ads: any;
  adSub: any;
  showSpinners = true;

  slideOpts = {
    effect: 'slide'
  };

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  public zoom: number;
  public place: any;

  constructor(public db: DatabaseService,
     public modalController: ModalController,
     public navCtrl: NavController,
     public router: Router,
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone,
     public geo: Geolocation) {

  }

  ngOnInit() {

    this.searchControl = new FormControl();
    /*
    this.adSub = this.db.queryDataWithCat().subscribe( () => {
      this.showSpinners = false;
    });
    */
  }

  ngAfterViewInit() {

    if (this.geo) {
      this.geo.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.db.setLat(resp.coords.latitude);
        this.db.setLng(resp.coords.longitude);
        this.db.setCenterPoint();
        this.showSpinners = false;
        // this.getCoordinatesToName(this.lat, this.lng);
        this.adSub = this.db.queryDataWithCat().subscribe( () => {
          console.log('All Done!');
        });
       }).catch((error) => {
         console.log('Error getting location', error);
         console.log('Sucks');
       });
    } else {
      this.adSub = this.db.queryDataWithCat().subscribe( () => {
        this.showSpinners = false;
      });
    }
  }

  async presentCatModal() {
    const modal = await this.modalController.create({
      component: CategoriesModalPage,
      componentProps: { isLatest: false }
    });
    return await modal.present();
  }

  ngOnDestroy() {
    // this.adSub.unsubscribe();
  }

  public goToPage(ad: any) {
    console.log(ad);
    this.router.navigateByUrl('/ad/' + ad.id);
  }
}
