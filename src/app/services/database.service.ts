import { Injectable, OnDestroy, OnInit } from '@angular/core';
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
export class DatabaseService implements OnDestroy, OnInit {

  public geo = geofirex.init(firebase);

  private currentEndPoint = 'Adverts';
  private liveEndPoint = 'Adverts';
  private altEndPoint = 'AdvertsDemo';

  public adsObs: Observable<any>;
  public adsLatestObs: Observable<any>;
  private dbRef: AngularFirestore;

  private adDoc: AngularFirestoreDocument<any>;
  public adObs: Observable<any>;

  public appSettings: any;

  private currentCategory: any = {
    description: 'all',
    operand: 'all',
    operation: '==',
    operator: 'cat1',
    title: 'ALL'
  };

  private catCollection: AngularFirestoreCollection<any>;
  private categoryObs: any;
  private lastOperator: any;
  private lastEndPoint: any;

  // GeoFire Stuff
  public lat = 40.7128;
  public lng = -74.0060;
  private center = this.geo.point(this.lat, this.lng);
  public radius = new BehaviorSubject(100);
  private radiusMin = 10;
  private radiusInc = 2;
  private radiusMax = 1000;
  private field = 'position';

  private pageLimit = 50;
  private pageMin = 50;
  private pageMax = 500;

  // Query Stuff
  public query: Observable<any>;
  public ads: any;
  public adsCollection: any;
  public adsLatestCollection: any;

  public isLatest = false;

  constructor(db: AngularFirestore) {
    this.dbRef = db;
  }

  public getLat(): number {
    return this.lat;
  }

  public getLng(): number {
    return this.lng;
  }

  public setLat(lat: number) {
    return this.lat = lat;
  }

  public setCenterPoint() {
    this.center = this.geo.point(this.lat, this.lng);
  }

  public setLng(lng: number) {
    return this.lng = lng;
  }

  ngOnInit() {
    this.getCategories().subscribe(data => {
      this.currentCategory = data[0];
    });
  }

  ngOnDestroy() {

  }

  public getAd(uid: string) {
    this.adDoc = this.dbRef.doc<any>(this.currentEndPoint + '/' + uid);
    return this.adObs = this.adDoc.valueChanges();
  }

  public getCategories() {
    this.categoryObs = this
      .dbRef
      .collection('Categories', ref => ref.orderBy('priority', 'asc')).valueChanges();
    return this.categoryObs;
  }

  public switchCategory(cat: any, isLatest: boolean) {
    this.currentCategory = cat;
    if (isLatest === false) {
      this.queryDataWithCat();
    } else {
      this.getLatestWithCat();
    }
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

  public getLatestWithCat() {
    this.adsLatestCollection = this
      .dbRef
      .collection(this.currentEndPoint, ref => ref.orderBy('timestamp', 'desc')
        .where(this.currentCategory.operator, '==', this.currentCategory.operand));
    return this.adsLatestObs = this.adsLatestCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  public queryDataWithCat() {

    this.center = this.geo.point(this.lat, this.lng);
    if (this.pageLimit > this.pageMax || this.pageLimit < 0) {
      this.pageLimit = this.pageMin;
    }

    this.adsCollection = this
      .geo
      .collection(this.currentEndPoint, ref => ref.where('status', '==', 'active')
        .where(this.currentCategory.operator, '==', this.currentCategory.operand)
        .limit(this.pageLimit));

    this.query = this.radius.pipe(
      switchMap(r => {
        // console.log("Im hitting the p " + r);
        console.log(this.adsCollection);
        return this.adsCollection.within(this.center, r, this.field);
      })
    );
    return this.query;
  }

  public incrementRadius() {
    let newValue = this.radius.value * this.radiusInc;
    if (newValue > this.radiusMax) {
      newValue = this.radiusMin;
    }
    this.radius.next(newValue);
  }

  public toogleEndPoints() {
    if (this.currentEndPoint === this.liveEndPoint) {
      this.currentEndPoint = this.altEndPoint;
    } else {
      this.currentEndPoint = this.liveEndPoint;
    }

    if (this.isLatest) {
      this.getLatestWithCat();
    } else {
      this.queryDataWithCat();
    }
  }

  public GetMyAds(uid: string) {
    const collection = this
    .dbRef
    .collection(this.currentEndPoint, ref => ref.orderBy('timestamp', 'desc')
      .where('uid', '==', uid));
    return collection.valueChanges();
  }
}
