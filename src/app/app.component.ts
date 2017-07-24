import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthenticationProvider } from "../providers/authentication/authentication";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //@ViewChild(Nav) nav: Nav;

  rootPage: any = 'WelcomePage';

  pages: Array<{title: string, page: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private authentication: AuthenticationProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Carte', page: 'HomePage' }
    ];

    this.authentication.authUser$.subscribe(user => {
      console.log('user authentication', user);
      this.rootPage = user != null ? 'HomePage' : 'WelcomePage';
    },
    err => console.log(err));

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('open page', page);
    //this.nav.setRoot(page.component);
  }

  ionViewDidLoad() {
    console.log('App component loaded')
  }
}
