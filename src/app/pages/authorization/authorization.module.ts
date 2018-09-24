import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthorizationPage } from './authorization.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthorizationPage]
})
export class AuthorizationPageModule {}
