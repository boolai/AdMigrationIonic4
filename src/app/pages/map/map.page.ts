import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriesModalPage } from '../categories-modal/categories-modal.page';
import { DatabaseService } from '../../services/database.service';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
/// <reference types="@types/googlemaps" />
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public lat = 50;
  public lng = 100;
  public mapHeight = '25';
  public styles: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  public zoom: number;
  public place: any;
  public adSub: any;
  public showSpinners = false;

  constructor(public modalController: ModalController,
    public db: DatabaseService,
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.searchControl = new FormControl();

    this.setMapStyle();
  }

  ngOnInit() {
    console.log('testing');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.db.setLat(position.coords.latitude);
        this.db.setLng(position.coords.longitude);
        this.db.setCenterPoint();
        // this.getCoordinatesToName(this.lat, this.lng);
        this.adSub = this.db.queryDataWithCat().subscribe(() => {
          this.showSpinners = false;
        });
      });
    } else {
      this.adSub = this.db.queryDataWithCat().subscribe(() => {
        this.showSpinners = false;
      });
    }
  }

  private setMapStyle() {
    this.db.queryAppSettings().subscribe(dat => {
      this.styles = JSON.parse(dat['mapStyle']);
    });
  }

  async presentCatModal() {
    const modal = await this.modalController.create({
      component: CategoriesModalPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  public toogleMapHeight() {
    if (this.mapHeight === '25') {
      this.mapHeight = '85';
    } else {
      this.mapHeight = '25';
    }
  }

  public increaseRadius() {
    this.db.incrementRadius();
  }

  public goToPage(ad: any) {
    this.router.navigateByUrl('/ad/' + ad.id);
  }

}
