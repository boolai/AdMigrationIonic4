import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-chat-client',
  templateUrl: './chat-client.page.html',
  styleUrls: ['./chat-client.page.scss'],
})
export class ChatClientPage implements OnInit {

  public ad:any;
  public adId:any;
  public sub:any;

  constructor(public router: Router,
    public route: ActivatedRoute,
    public db:DatabaseService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.adId = params['id']; // (+) converts string 'id' to a number
      this.db.getAd(this.adId).subscribe(data => {
        this.ad = data;
        console.log(data);
      });
      // In a real app: dispatch action to load the details here.
    });

  }

  public goBack() {
    this.router.navigateByUrl('/ad/' + this.adId);
  }

}
