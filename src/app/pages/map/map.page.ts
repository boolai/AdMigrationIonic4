import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriesModalPage } from '../categories-modal/categories-modal.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  async presentCatModal() {
    const modal = await this.modalController.create({
      component: CategoriesModalPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
