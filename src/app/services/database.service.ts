import { Injectable } from '@angular/core';
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
export class DatabaseService {

  public geo = geofirex.init(firebase);

  private currentEndPoint:string = 'Adverts';
  private liveEndPoint:string = 'Adverts';
  private altEndPoint:string = 'AdvertsDemo';

  private adsObs: Observable<any>;
  private dbRef:AngularFirestore;

  private adDoc: AngularFirestoreDocument<any>;
  private adObs: Observable<any>;

  private currentCategory:any;
  private categoryObs:any;

  //GeoFire Stuff
  private center = this.geo.point(40.7128, -74.0060);
  private radius = new BehaviorSubject(100000);
  private field = 'position';
  private lat:number = 40.8448;
  private lng:number = -73.8648;
  
  //Query Stuff
  public query: Observable<any>;
  public ads:any;
  private adsCollection:any;

  public showSpinners:boolean = true;

  constructor(db: AngularFirestore) {
    this.dbRef = db;
   }

   public getAd(uid:string) {
    this.adDoc = this.dbRef.doc<any>(this.currentEndPoint + '/' + uid);
    return this.adObs = this.adDoc.valueChanges();
   }

   public getAds() {
    this.adsObs = this.dbRef.collection(this.currentEndPoint).valueChanges();
    return this.adsObs;
   }

   public getAdsViaGeoPoint() {

    this.adsCollection = this.geo.collection(this.currentEndPoint, ref => ref.where('status', '==', 'active').where('cat1', '==', 'all').limit(50));

    this.query = this.radius.pipe(
      switchMap(r => {
        //console.log("Im hitting the p " + r);
        return this.adsCollection.within(this.center, r, this.field);
      })
    );

    return this.query;
   }

   public getCategories() {
    ;
     this.categoryObs = this.dbRef.collection('Categories', ref => ref.orderBy('priority','asc')).valueChanges();
     return this.categoryObs;
   }

   public switchCategory(cat:any) {
    this.currentCategory = cat;
   }
}
