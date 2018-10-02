import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriesModalPage } from '../categories-modal/categories-modal.page';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public lat = 50;
  public lng = 100;
  public mapHeight = '25';

  constructor(public modalController: ModalController,
  public db: DatabaseService) { }

  ngOnInit() {
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

}
