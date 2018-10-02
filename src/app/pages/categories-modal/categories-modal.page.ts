import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.page.html',
  styleUrls: ['./categories-modal.page.scss'],
})
export class CategoriesModalPage implements OnInit, OnDestroy {

  public dbRef: DatabaseService;
  public cats: any;
  public sub: any;
  private modalCtrlRef: ModalController;

  constructor(db: DatabaseService, modalCtrl: ModalController) {
    this.dbRef = db;
    this.modalCtrlRef = modalCtrl;
   }

  ngOnInit() {
    this.sub = this.dbRef.getCategories().subscribe( data => {
      this.cats = data;
    });
  }

  ngOnDestroy() {
    
  }

  public switchCat(cat: any) {
    this.dbRef.switchCategory(cat);
    console.log(cat);
    this.closeModal();
  }

  public closeModal() {
    this.modalCtrlRef.dismiss();
  }

  public toogleEndPoint() {
    this.dbRef.toogleEndPoints();
  }

  public increaseRadius() {
    this.dbRef.incrementRadius();
  }

}
