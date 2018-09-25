import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import 'rxjs/add/operator/map';
import { get } from 'geofirex';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnDestroy {

  public geo = geofirex.init(firebase);

  private currentEndPoint = 'Adverts';
  private liveEndPoint = 'Adverts';
  private altEndPoint = 'AdvertsDemo';

  private adsObs: Observable<any>;
  private dbRef: AngularFirestore;

  private adDoc: AngularFirestoreDocument<any>;
  private adObs: Observable<any>;

  public appSettings: any;

  private currentCategory: any;
  private categoryObs: any;

  // GeoFire Stuff
  private center = this.geo.point(40.7128, -74.0060);
  private radius = new BehaviorSubject(100000);
  private field = 'position';
  private lat  = 40.8448;
  private lng  = -73.8648;

  // Query Stuff
  public query: Observable<any>;
  public ads: any;
  private adsCollection: any;

  public showSpinners = true;

  constructor(db: AngularFirestore) {
    this.dbRef = db;
   }

   ngOnDestroy() {
     
   }

   public getAd(uid: string) {
    this.adDoc = this.dbRef.doc<any>(this.currentEndPoint + '/' + uid);
    return this.adObs = this.adDoc.valueChanges();
   }

   public getAds() {
    this.adsObs = this.dbRef.collection(this.currentEndPoint).valueChanges();
    return this.adsObs;
   }

   public getAdsViaGeoPoint() {

    this.adsCollection = this
    .geo
    .collection(this.currentEndPoint, ref => ref.where('status', '==', 'active').where('cat1', '==', 'all').limit(50));

    this.query = this.radius.pipe(
      switchMap(r => {
        // console.log("Im hitting the p " + r);
        return this.adsCollection.within(this.center, r, this.field);
      })
    );

    return this.query;
   }

   public getCategories() {
     this.categoryObs = this
     .dbRef
     .collection('Categories', ref => ref.orderBy('priority', 'asc')).valueChanges();
     return this.categoryObs;
   }

   public switchCategory(cat: any) {
    this.currentCategory = cat;
   }

   public queryAppSettings() {

     const doc = this.dbRef.collection('AppSettings').doc('LustyLuv');

     return doc.valueChanges();
   }

   public queryCollection(path: string) {
     const collection = this.dbRef.collection(path);
     return collection.valueChanges();
   }

   public updateCollection(path: string, data: any) {
     const collection = this.dbRef.collection(path);
     data['createAt'] = firebase.firestore.FieldValue.serverTimestamp();
     return collection.add(data);
   }
}
