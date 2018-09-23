import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'LustyLuv',
      url: '/home',
      icon: 'home',
      isAuth: 'default'
    },
    {
      title: 'Map',
      url: '/map',
      icon: 'globe',
      isAuth: 'default'
    },
    {
      title: 'Log In',
      url: '/authorization',
      icon: 'key',
      isAuth: false
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'key',
      isAuth: true
    },
    {
      title: 'Log Out',
      url: '/logout',
      icon: 'key',
      isAuth: true
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
