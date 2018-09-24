import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  private returnPath: any;
  private data: any;
  username = new FormControl('');
  password = new FormControl('');

  authForm: FormGroup;

  constructor(public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController) {

    this.route.params.subscribe(params => {
      this.returnPath = params['returnPath'];
      this.data = params['data'];
    });

    this.authForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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

  public logInViaEmail() {

    const credentials = this.authForm.value;
    console.log(credentials);
    console.log(this.authForm.value);

    if (this.authForm.valid) {
      this.auth.signInWithEmailPassword(this.authForm.get('username').value, this.authForm.get('password').value)
      .then(user => {
        console.log('successful log in');
        this.router.navigateByUrl('/profile');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {

          this.auth.registerWithEmailPassword(this.authForm.get('username').value, this.authForm.get('password').value)
          .then( dat => {
            this.router.navigateByUrl('/profile');
          })
          .catch(errorSub => {
            this.presentAlert('Log In Error', errorSub.message);
          });

        } else {
          this.presentAlert('Log In Error', error.message);
        }
      });
    } else {
      this.presentAlert('Log In Error', 'Please enter all forms.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
