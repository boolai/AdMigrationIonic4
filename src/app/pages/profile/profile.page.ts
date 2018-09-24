import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public profilePic: any;
  public user: any;

  constructor(public auth: AuthService,
  public router: Router) {

    this.auth.currentUserDBData
    .subscribe( user => {
      this.user = user;
      console.log(user);
    });

    console.log(this.auth.currentUser);

  }

  ngOnInit() {
  }

  public goToPage(path: any) {
    this.router.navigateByUrl('/' + path);
  }

}
