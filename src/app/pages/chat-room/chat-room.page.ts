import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit, OnDestroy {

  public chats: any;
  public subs: any;
  public sub: any;
  public cat: any;
  message = new FormControl('');

  chatForm: FormGroup;

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
    const dat = {
      userId: this.auth.currentUserId,
      text: 'testing',
      time: 'whatever'
    };

    this.db.updateCollection('ChatRooms/' + this.cat + '/chats', dat)
      .then(() => {
        // Clear old text
      })
      .catch(error => {

      });
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
