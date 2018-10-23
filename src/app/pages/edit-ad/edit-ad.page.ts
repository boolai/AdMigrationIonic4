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
        this.myForm.setValue({
          age: (this.ad.age) ? this.ad.age : '18',
          availability: (this.ad.availability) ? this.ad.availability : '' ,
          cat1: (this.ad.cat1) ? this.ad.cat1 : 'All',
          cat2: (this.ad.cat2) ? this.ad.cat2 : 'All' ,
          city: (this.ad.city) ? this.ad.city : 'Bronx',
          description: (this.ad.description) ? this.ad.description : 'My description',
          email: (this.ad.email) ? this.ad.email : 'email@email.com',
          ethnicity: (this.ad.ethnicity) ? this.ad.ethnicity : 'Latino',
          eyes: (this.ad.eyes) ? this.ad.eyes : 'Brown',
          uid: (this.ad.uid) ? this.ad.uid : this.auth.currentUserId,
          website: (this.ad.website) ? this.ad.website : 'www.lustyluv.com',
          twitter: (this.ad.twitter) ? this.ad.twitter : 'www.lustyluv.com',
          weight: (this.ad.weight) ? this.ad.weight : '99 pounds' ,
          gender: (this.ad.gender) ? this.ad.gender : 'male',
          hair: (this.ad.hair) ? this.ad.hair : 'Brown',
          height: (this.ad.height) ? this.ad.height : '58',
          isChatOn: (this.ad.isChatOn) ? this.ad.isChatOn : true,
          measurements: (this.ad.measurements) ? this.ad.measurements : '38 dd ',
          name: (this.ad.name) ? this.ad.name : 'LustyLuv',
          phone: (this.ad.phone) ? this.ad.phone : '555 555 5555',
          title: (this.ad.title) ? this.ad.title : 'LustyLuv Ad'

        });

      });
      // In a real app: dispatch action to load the details here.
    });
  }

  public goBack() {
    this.location.back();
  }

}
