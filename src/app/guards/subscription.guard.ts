import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  isAuthorize: boolean;
  constructor(private router: Router,
    public auth: AuthService,
    private alertCtrl: AlertController) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.authenticated === false || this.auth.userDBObject.status !== 'active') {
        this.presentAlert('Subscription', 'Must be a subscribed member in order to continue.');
        this.isAuthorize = false;
      } else {
        this.isAuthorize = true;
      }
    return this.isAuthorize;
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
