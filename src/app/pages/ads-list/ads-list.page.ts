import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.page.html',
  styleUrls: ['./ads-list.page.scss'],
})
export class AdsListPage implements OnInit {

  public ads: any;
  public showSpinners = true;

  constructor(public location: Location,
  public db: DatabaseService,
  public auth: AuthService,
  public actionSheetController: ActionSheetController,
  public router: Router) {}

  ngOnInit() {
    this.db.GetMyAds(this.auth.currentUserId).subscribe( data => {
      console.log(data);
      this.ads = data;
      this.showSpinners = false;
    });
  }

  public goBack() {
    this.location.back();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'this.ad.phone',
        role: 'destructive',
        icon: 'call',
        handler: () => {
          console.log('Call clicked');
        }
      }, {
        text: 'this.ad.email',
        icon: 'mail',
        handler: () => {
          console.log('Email clicked');
          window.location.href = 'mailto:?subject=From Lusty Luv&body=Lusty Luv Message:';
        }
      }, {
        text: 'Website ',
        icon: 'globe',
        handler: () => {
          console.log('Email clicked');
        }
      },
      {
        text: 'Twitter ',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Email clicked');

        }
      }, {
        text: 'Chat',
        icon: 'chatboxes',
        handler: () => {
          console.log('Play clicked');
          // Set route here

        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
          // save to user's favorites
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          // go back
        }
      }]
    });
    await actionSheet.present();
  }

  public goToPage(ad: any) {
    console.log(ad);
    this.router.navigateByUrl('/editAd/' + ad.id);
  }
}
