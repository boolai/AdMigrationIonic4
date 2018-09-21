import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: any = null;//
  private subscription: any = null;
  private subscriptionUser: any = null;
  private userDBDoc: AngularFirestoreDocument<any>;
  private userObs: Observable<any>;
  private userDb: any;  //The user document from the database

  constructor(private afsAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private gplus: GooglePlus) {
    this.subscription = this.afsAuth.authState.subscribe((auth) => {

      this.authState = auth;

      if (this.authState !== null) {
        this.subscriptionUser = this.currentUserDBData.subscribe(user => {
          this.userDb = user;
          console.log(user);
        });
      }
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afsAuth.authState
  }

  //Returns current user's uid
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  //Return user name
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }

  //Returns user observable
  get currentUserDBData(): any {
    this.userDBDoc = this.afs.collection('Users').doc(this.currentUserId);
    this.userObs = this.userDBDoc.valueChanges();
    return this.userObs;
  }

  //Assumes that this has been queried already
  get userDBObject():any {
    return this.userDb;
  }
}