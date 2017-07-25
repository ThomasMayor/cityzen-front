import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthenticationProvider } from "../providers/authentication/authentication";
import { ConfigProvider } from '../providers/config/config';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //@ViewChild(Nav) nav: Nav;

  rootPage: any = 'WelcomePage';

  pages: Array<{title: string, page: string, icon: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private authentication: AuthenticationProvider,
              private config: ConfigProvider) {

    this.initializeApp();
    this.initializeScripts();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Carte des Constats', page: 'HomePage', icon: 'map' },
      { title: 'Mes Constats', page: 'MyReportsPage', icon: 'clipboard' },
      { title: 'Mon Profil', page: 'ProfilePage', icon: 'contact' },
    ];
    console.log('app component constructor');
    this.authentication.checkLogin();
    this.authentication.authUser$.subscribe(user => {
      console.log('user authentication', user);
      this.rootPage = user != null ? 'HomePage' : 'WelcomePage';
    },
    err => console.log(err));

  }

  initializeScripts() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =`https://maps.googleapis.com/maps/api/js?key=${this.config.GOOGLE_API_KEY}&language=fr`;
    script.defer = true;
    script.async = true;
    script.id = "googleMaps";
    document.body.appendChild(script);
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

  logout() {
    this.authentication.logout();
  }

  ionViewDidLoad() {
    console.log('App component loaded')
  }
}
