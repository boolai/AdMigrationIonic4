import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { GalleryModalPage } from '../gallery-modal/gallery-modal.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit, OnDestroy {

  private uid: string;
  private sub: any;
  private ad: any;
  private showSpinners = true;

  constructor(public router: Router,
    public actionSheetController: ActionSheetController,
    public route: ActivatedRoute,
    public db: DatabaseService,
    public callNumber: CallNumber,
    private modalCtrl: ModalController,
    private iab: InAppBrowser,
    public auth: AuthService) {
  }

  ngOnInit() {
    this.showSpinners = true;
    this.sub = this.route.params.subscribe(params => {
      this.uid = params['id']; // (+) converts string 'id' to a number
      this.db.getAd(this.uid).subscribe(data => {
        this.ad = data;
        console.log(data);
        this.showSpinners = false;
      });
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public goBack() {
    this.router.navigateByUrl('/home');
  }

  public goToChat() {

    if (this.auth.authenticated) {
      this.router.navigateByUrl('/chatClient/' + this.ad.id);
    } else {
      this.router.navigateByUrl('/authorization/chatClient/' + this.ad.id);
    }
  }

  async openGallery(photo: any) {
    const modal = await this.modalCtrl.create({
      component: GalleryModalPage,
      componentProps: { value: photo }
    });
    return await modal.present();
  }

  openWebLink(url: string) {
    const browser = this.iab.create(url, '_blank');
    browser.show();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: this.ad.phone,
        role: 'destructive',
        icon: 'call',
        handler: () => {
          console.log('Call clicked');
          window.open('tel:+' + this.ad.phone);
        }
      }, {
        text: this.ad.email,
        icon: 'mail',
        handler: () => {
          console.log('Email clicked');
          window.location.href = 'mailto:' + this.ad.email + '?subject=From Lusty Luv&body=Lusty Luv Message:';
        }
      }, {
        text: 'Website ',
        icon: 'globe',
        handler: () => {
          console.log('Email clicked');
          const browser = this.iab.create(this.ad.website, '_blank');
          browser.show();
        }
      },
      {
        text: 'Twitter ',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Email clicked');
          const browser = this.iab.create(this.ad.twitter, '_blank');
          browser.show();
        }
      }, {
        text: 'Chat',
        icon: 'chatboxes',
        handler: () => {
          console.log('Play clicked');
          // Set route here
          this.goToChat();
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

  randomImage() {
    return Math.floor(Math.random() * this.ad.photos.length - 1);
  }

}
