import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-rooms-list',
  templateUrl: './chat-rooms-list.page.html',
  styleUrls: ['./chat-rooms-list.page.scss'],
})
export class ChatRoomsListPage implements OnInit {

  public chatRooms: any;

  constructor(public db: DatabaseService,
  public location: Location,
  public router: Router) {
    this.db.getCategories().subscribe( cats => {
      this.chatRooms = cats;
      console.log(this.chatRooms);
    });
  }

  ngOnInit() {
  }

  public goBack() {
    this.location.back();
  }

  public goToPage(room: any) {
    this.router.navigateByUrl('/chatRoom/' + room.title);
  }
}
