import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit, OnDestroy {

  public ads: any;
  public chats: any;
  public subs: any;
  public sub: any;
  public subAds: any;
  public cat: any;
  message = new FormControl('');

  chatForm: FormGroup;

  slideOpts = {
    effect: 'slide',
    loop: true
  };

  constructor(public location: Location,
    public auth: AuthService,
    public db: DatabaseService,
    public router: Router,
    public route: ActivatedRoute,
    private alertCtrl: AlertController,
    public fb: FormBuilder) {

      this.chatForm = this.fb.group({
        message: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.cat = params['cat']; // (+) converts string 'id' to a number
      if (this.cat !== undefined) {
        this.subs = this.db.queryCollection('ChatRoomsGlobal/' + this.cat + '/chats')
          .subscribe(data => {
            this.chats = data;
            console.log(data);
          });

        this.ads = this.db.getAds();

      } else {
        // Send alert and re route
        this.presentAlert('Error', 'Room does not exist');
        this.goBack();
      }
    });
  }

  ngOnDestroy() {
    if ( this.subs !== undefined) {
      this.subs.unsubscribe();
    }

    if ( this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  public goBack() {
    this.location.back();
  }

  public postChat() {
    if (this.chatForm.valid === true && this.chatForm.get('message').value.length > 1 &&  this.chatForm.get('message').value !== "↵") {

    const dat = {
      userId: this.auth.currentUserId,
      text: this.chatForm.get('message').value,
      userName: this.auth.currentUserDisplayName,
      photoUrl: this.auth.userDBObject.photoURL
    };

    this.db.updateCollection('ChatRoomsGlobal/' + this.cat + '/chats', dat)
      .then(() => {
        // Clear old text
        this.chatForm.get('message').setValue('');
      })
      .catch(error => {
        this.presentAlert('Error', error.message);
      });

    } else {
      this.chatForm.get('message').setValue('');
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

  isChatPartner(chat) {
    return chat.userId === this.auth.currentUserId;
  }

  slidesDidLoad(slides: Slides) {
    slides.startAutoplay();
  }
}
