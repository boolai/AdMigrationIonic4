import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.page.html',
  styleUrls: ['./post-ad.page.scss'],
})
export class PostAdPage implements OnInit {

  myForm: FormGroup;
  cats: any;

  constructor(public location: Location,
    public fb: FormBuilder,
    public db: DatabaseService,
    public auth: AuthService,
    public alertController: AlertController) { }

  ngOnInit() {
    console.log('Init');
    this.myForm = this.fb.group({
      age: '',
      availability: '',
      cat1: 'all',
      cat2: 'all',
      city: '',
      description: '',
      email: '',
      ethnicity: '',
      eyes: '',
      uid: '',
      website: '',
      twitter: '',
      weight: '',
      gender: '',
      hair: '',
      height: '',
      isChatOn: true,
      measurements: '',
      name: '',
      phone: '555 555 5555',
      title: '',
      ethinicty: 'world'
    });

    this.myForm.valueChanges.subscribe(console.log);
    this.cats = this.db.getCategories();
  }

  public goBack() {
    this.location.back();
  }

  public save() {

    if ( this.myForm.valid ) {

      let dat = this.myForm.value;
      dat['uid'] = this.auth.currentUserId;
      if ( dat['cat2'] === undefined) {
        dat['cat2'] = 'all';
      }

      this.db.updateCollection('Adverts', dat)
      .then( d => {
        console.log(d);
        this.presentAlert();
        this.myForm.reset();
      })
      .catch( error => {
        console.log(error);
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Saved',
      message: 'Your Ad is Saved',
      buttons: ['OK']
    });

    await alert.present();
  }

}
