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
     private ngZone: NgZone) {

  }

  ngOnInit() {

    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          this.place = google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          console.log(this.place);
          // set latitude, longitude and zoom
          this.db.setLat(this.place.geometry.location.lat());
          this.db.setLng(this.place.geometry.location.lng());
          this.db.queryDataWithCat();
        });
      });
    });
  }

  ngAfterViewInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.db.setLat(position.coords.latitude);
        this.db.setLng(position.coords.longitude);
        this.db.setCenterPoint();
        // this.getCoordinatesToName(this.lat, this.lng);
        this.adSub = this.db.queryDataWithCat().subscribe( () => {
          this.showSpinners = false;
        });
      });
    } else {
      this.db.queryDataWithCat();
      this.adSub = this.db.ads.subscribe( () => {
        this.showSpinners = false;
      });
    }
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

  public goToPage(ad: any) {
    this.router.navigateByUrl('/ad/' + ad.id);
  }
}
