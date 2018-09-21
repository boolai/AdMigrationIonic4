import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.page.html',
  styleUrls: ['./gallery-modal.page.scss'],
})
export class GalleryModalPage implements OnInit {

  @Input() value: any;

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {

    console.log(this.value);
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

}
