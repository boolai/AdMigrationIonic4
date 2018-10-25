import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-chat-host',
  templateUrl: './chat-host.page.html',
  styleUrls: ['./chat-host.page.scss'],
})
export class ChatHostPage implements OnInit {

  pathID: any;
  chats: any;
  message = new FormControl('');

  chatForm: FormGroup;

  constructor(public location: Location,
    public router: Router,
    public route: ActivatedRoute,
    public db: DatabaseService,
    public auth: AuthService,
    public fb: FormBuilder) { 
      this.chatForm = this.fb.group({
        message: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      });
    }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.pathID = params['path']; // (+) converts string 'id' to a number
      console.log(this.pathID);

      this.chats = this.db.GetMyAnymmousChat(this.pathID, this.auth.currentUserId);
      this.chats.subscribe( dat => {
        console.log(dat);
      });
    });
  }

  public goBack() {
    this.location.back();
  }

  isChatPartner(chat) {
    return chat.userId === this.auth.currentUserId;
  }

}
