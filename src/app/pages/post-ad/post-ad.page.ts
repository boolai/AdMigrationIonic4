import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

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
    public db: DatabaseService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      message: '',
      phone: '555 555 5555',
      title: '',
      name: '',
      website: '',
      twitter: '',
      isChatOn: false,
      description: '',
      age: '',
      height: '',
      hair: '',
      measurements: '',
      weight: '',
      gender: '',
      city: '',
      eyes: '',
      location: '',
      category: 'All'
    });

    this.myForm.valueChanges.subscribe(console.log);
    this.cats = this.db.getCategories();
  }

  public goBack() {
    this.location.back();
  }

}
