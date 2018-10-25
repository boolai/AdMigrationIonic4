import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  public rooms: any;

  constructor(public location: Location,
  public db: DatabaseService,
  public auth: AuthService,
  public router: Router ) { }

  ngOnInit() {

    this.rooms = this.db.GetMyAnymmousChatsList(this.auth.currentUserId);
    this.rooms.subscribe(dat => {
      console.log(dat);
    });
  }

  public goBack() {
    this.location.back();
  }

  public goToPage(path: any) {
    console.log(path);
    this.router.navigateByUrl('chatHost/' + path.link);
  }
}
