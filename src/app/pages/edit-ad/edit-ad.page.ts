import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.page.html',
  styleUrls: ['./edit-ad.page.scss'],
})
export class EditAdPage implements OnInit {

  myForm: FormGroup;
  cats: any;
  uid: any;
  ad: any;

  constructor(public location: Location,
    public fb: FormBuilder,
    public db: DatabaseService,
    public auth: AuthService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public route: ActivatedRoute) { }

  ngOnInit() {

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
      title: ''
    });

    this.myForm.valueChanges.subscribe(console.log);
    this.cats = this.db.getCategories();

    this.route.params.subscribe(params => {
      this.uid = params['id']; // (+) converts string 'id' to a number
      this.db.getAd(this.uid).subscribe(data => {
        this.ad = data;
        console.log(data);
        this.myForm.setValue({
          age: this.ad.age,
          availability: this.ad.availability,
          cat1: this.ad.cat1,
          cat2: this.ad.cat2,
          city: '',
          description: this.ad.description,
          email: this.ad.email,
          ethnicity: this.ad.ethnicity,
          eyes: this.ad.eyes,
          uid: this.ad.uid,
          website: this.ad.website,
          twitter: this.ad.twitter,
          weight: this.ad.weight,
          gender: this.ad.gender,
          hair: this.ad.hair,
          height: this.ad.height,
          isChatOn: this.ad.isChatOn,
          measurements: this.ad.measurements,
          name: this.ad.name,
          phone: this.ad.phone,
          title: this.ad.title

        });

      });
      // In a real app: dispatch action to load the details here.
    });
  }

}
