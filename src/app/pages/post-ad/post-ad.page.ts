import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.page.html',
  styleUrls: ['./post-ad.page.scss'],
})
export class PostAdPage implements OnInit {

  myForm: FormGroup;

  constructor(public location: Location, public fb: FormBuilder) { }

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
      city: ''
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  public goBack() {
    this.location.back();
  }

}
