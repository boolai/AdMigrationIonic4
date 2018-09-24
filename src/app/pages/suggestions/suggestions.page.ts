import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

  email = new FormControl('');
  comment = new FormControl('');

  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
  private db: DatabaseService,
  private alertCtrl: AlertController) {
    this.commentForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      comment: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  public sendComment() {
    if (this.commentForm.valid) {
      const data = {
        email: this.commentForm.get('email').value,
        text: this.commentForm.get('comment').value
      };

      this.db.updateCollection('Suggestions', data)
      .then(() => {
        // Give Alert
        // Clear inputs
        this.presentAlert('Success!', 'Your suggestion will be reviewed.');
        this.commentForm.get('comment').setValue('');
      })
      .catch(error => {
        // Give Alert
        this.presentAlert('Failure!', error.message);
      });
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
