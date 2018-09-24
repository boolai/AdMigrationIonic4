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
      title: 'Latest Lusties',
      url: '/latest',
      icon: 'heart',
      isAuth: 'default'
    },
    {
      title: 'Luv Shacks',
      url: '/chatRoomsList',
      icon: 'chatbubbles',
      isAuth: 'default'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person',
      isAuth: true
    },
    {
      title: 'News',
      url: '/news',
      icon: 'paper',
      isAuth: 'default'
    },
    {
      title: 'Suggestions',
      url: '/suggestions',
      icon: 'microphone',
      isAuth: 'default'
    },
    {
      title: 'Legal',
      url: '/legal',
      icon: 'book',
      isAuth: 'default'
    },
    {
      title: 'Log In',
      url: '/authorization',
      icon: 'log-in',
      isAuth: false
    },
    {
      title: 'Log Out',
      url: '/logout',
      icon: 'log-out',
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
