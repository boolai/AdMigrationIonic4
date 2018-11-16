import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.page.html',
  styleUrls: ['./post-ad.page.scss'],
})
export class PostAdPage implements OnInit {

  @ViewChild(Slides) slides: Slides;

  myForm: FormGroup;
  cats: any;
  task: AngularFireUploadTask;
  progress: any;  // Observable 0 to 100
  image: string; // base64
  downloadURL: Observable<string>;
  unsub: any;
  photos: string [] = new Array();
  slideOpts = {
    effect: 'slide'
  };

  constructor(public location: Location,
    public fb: FormBuilder,
    public db: DatabaseService,
    public auth: AuthService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public fileStorage: AngularFireStorage,
    private camera: Camera) { }

  async captureImage(srcType: string) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: (srcType === 'camera') ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options)
      .catch(err => {
        this.presentAlert(err);
      });
  }

  createUploadTask(file: string): void {

    const filePath = `my-pet-crocodile_${new Date().getTime()}.jpg`;
    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.fileStorage.ref(filePath).putString(this.image, 'data_url');
    this.progress = this.task.percentageChanges();
    const fileRef = this.fileStorage.ref(filePath);
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        console.log(this.downloadURL);
        this.unsub = this.downloadURL.subscribe(url => {
          console.log(url);
          this.photos.push(url);
          this.slides.update();
          console.log('# of Slides => ' + this.slides.length());
          this.unsub.unsubscribe();
        });
      })
    ).subscribe();
  }

  async uploadHandler(srcType: string) {
    const base64 = await this.captureImage(srcType);
    this.createUploadTask(base64);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      age: '',
      availability: '',
      cat1: 'all',
      cat2: 'all',
      city: '',
      description: '',
      email: '',
      ethnicity: '',
      eyes: '',
      uid: '',
      website: '',
      twitter: '',
      weight: '',
      gender: '',
      hair: '',
      height: '',
      isChatOn: true,
      measurements: '',
      name: '',
      phone: '555 555 5555',
      title: '',
      ethinicty: 'world'
    });

    this.myForm.valueChanges.subscribe(console.log);
    this.cats = this.db.getCategories();
    
  }

  public goBack() {
    this.location.back();
  }

  public save() {

    if (this.myForm.valid) {

      const dat = this.myForm.value;
      dat['uid'] = this.auth.currentUserId;
      if (dat['cat2'] === undefined) {
        dat['cat2'] = 'all';
      }

      this.db.updateCollection('Adverts', dat)
        .then(d => {
          console.log(d);
          this.presentAlert('Your Ad is Saved');
          this.myForm.reset();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  async presentAlert(mess: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Save',
          icon: 'create',
          handler: () => {
            console.log('Share clicked');
            this.save();
          }
        }, {
          text: 'Reset',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
            this.myForm.reset();
          }
        }, {
          text: 'Map',
          icon: 'globe',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  slideChanged() {
    const currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  loadPrev() {
    console.log('Prev');
    let newIndex = this.slides.getActiveIndex();

    newIndex++;

    // Workaround to make it work: breaks the animation
    this.slides.slideTo(newIndex, 0, false);

}

loadNext() {
    if(this.firstLoad) {
      // Since the initial slide is 1, prevent the first 
      // movement to modify the slides
      this.firstLoad = false;
      return;
    }

    console.log('Next');
    let newIndex = this.slider.getActiveIndex();

    newIndex--;
    this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
    this.numbers.shift();

    // Workaround to make it work: breaks the animation
    this.slider.slideTo(newIndex, 0, false);

    console.log(`New status: ${this.numbers}`);
}
}
