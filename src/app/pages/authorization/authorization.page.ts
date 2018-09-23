import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  private returnPath: any;
  private data: any;

  constructor(public auth: AuthService,
  public router: Router,
  public route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.returnPath = params['returnPath'];
      this.data = params['data'];
    });
   }

  ngOnInit() {
    if (this.auth.authenticated && this.auth.currentUserAnonymous === false) {
      console.log('You are already logged in');
      this.goToPage('/profile');
    }
  }

  public goToPage(path: string) {
    this.router.navigateByUrl(path);
  }

  public goToRoute() {

    if (this.returnPath === undefined) {
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl(this.returnPath + '/' + this.data);
    }
  }
}
