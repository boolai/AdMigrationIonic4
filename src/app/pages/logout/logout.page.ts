import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {

  constructor(public auth: AuthService,
    public router: Router,
    public location: Location) { }

  public logOff() {
    this.auth.signOut();
    this.location.back();
  }

  public goBack() {
    this.location.back();
  }

}
