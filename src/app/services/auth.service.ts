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

  private authState: any = null;
  private subscription: any = null;
  private subscriptionUser: any = null;
  private userDBDoc: AngularFirestoreDocument<any>;
  private userObs: Observable<any>;
  private userDb: any;  // The user document from the database

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
    return this.afsAuth.authState;
  }

  // Returns current user's uid
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Return user name
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authState['displayName'] || 'User without a Name';
    }
  }

  // Returns user observable
  get currentUserDBData(): any {
    this.userDBDoc = this.afs.collection('Users').doc(this.currentUserId);
    this.userObs = this.userDBDoc.valueChanges();
    return this.userObs;
  }

  // Assumes that this has been queried already
  get userDBObject(): any {
    return this.userDb;
  }

  // Proccess the stripe payment
  processPayment(token: any) {

    console.log(token);

    this.userDb.status = 'processing';

    return this
      .afs
      .collection('Users')
      .doc(this.currentUserId)
      .update({
        status: 'processing'
      })
      .then(d => {
        console.log(d);
        return this
          .afs
          .collection('Users')
          .doc(this.currentUserId + '/stripeMeta/token')
          .set({
            token: token,
            tokenId: token.id,
            stripeID: this.userDb.stripeID
          }, { merge: true })
      });
  }

  // Social networks
  public signInWithTwitterWeb() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  public signInWithFacebookWeb() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  public signInWithGoogleWeb() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  // Future proofing
  private socialSignIn(provider: any) {
    return this.afsAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        this.updateUserData();
      })
      .catch(error => console.log(error))
  }

  public signInWithEmailPassword(email: string, password: string) {
    return this
      .afsAuth
      .auth
      .signInWithEmailAndPassword(email, password)
  }

  public registerWithEmailPassword(email: string, password: string) {

    return this.afsAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public signInAnonymously() {
    return this.afsAuth.auth.signInAnonymously()
      .then((user) => {
        return this.authState = user;
      })
  }

  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }

  signOut(): void {
    this.afsAuth.auth.signOut();
  }

  private updateUserData(): void {
    const path = `Users/${this.currentUserId}`;
    const data = {
      email: this.authState.email,
      name: this.authState.displayName
    };

    this.afs.doc(path).update(data)
    .catch( error => {
      console.log(error);
    });
  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    const gplusUser = await this.gplus.login({
      'webClientId': '352394499087-f1t9fn297b2p0ee2jprgtk3d4kgp294d.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    });

    return await this.afsAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  }

  /*
  facebookLogin(): Promise<any> {
    return this.fb.login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        return firebase.auth().signInWithCredential(facebookCredential)


      })
  }
  */
}