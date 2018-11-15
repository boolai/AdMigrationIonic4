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

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.page.html',
  styleUrls: ['./post-ad.page.scss'],
})
export class PostAdPage implements OnInit {

  myForm: FormGroup;
  cats: any;
  task: AngularFireUploadTask;
  progress: any;  // Observable 0 to 100
  image: string; // base64
  downloadURL: Observable<string>;

  constructor(public location: Location,
    public fb: FormBuilder,
    public db: DatabaseService,
    public auth: AuthService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public fileStorage: AngularFireStorage,
    private camera: Camera) {}

  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
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
        this.downloadURL.subscribe(url => {
          console.log(url);
        });
      })
    ).subscribe();

    /*
    fileRef.getDownloadURL().subscribe(ref => {
      console.log('REF', ref);
      this.downloadURL = ref;
    });*/
  }

  async uploadHandler() {
    const base64 = await this.captureImage();
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
}
