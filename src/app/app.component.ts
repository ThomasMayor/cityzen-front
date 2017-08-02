import { Component, ViewChild} from '@angular/core';
import { Platform, Events, Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthenticationProvider } from "../providers/authentication/authentication";
import { ConfigProvider } from '../providers/config/config';
import { IUser } from '../models/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user: IUser = null;
  rootPage: any = 'WelcomePage';
  pages: Array<{title: string, page: string, icon: string, params: any}>;
  private initialized: boolean = false;
  private refreshUserInt: any = null;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private authentication: AuthenticationProvider,
              private config: ConfigProvider,
              private events: Events) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Carte des Constats', page: 'HomePage', icon: 'map', params: {} },
      { title: 'Mes Constats', page: 'ReportsPage', icon: 'clipboard', params: {} },
      { title: 'Mon Profil', page: 'EditProfilPage', icon: 'contact', params: {} },
    ];

    this.authentication.authUser$.subscribe(user => {
      if (!this.initialized) {
        this.splashScreen.hide();
        this.initialized = true;
      }
      this.user = user;
      //refresh user each five minutes for score
      if (user && !this.refreshUserInt) {
        this.refreshUserInt = setInterval(_ => this.authentication.checkLogin(), 300000);
      }
      else if (!user && this.refreshUserInt) {
        clearInterval(this.refreshUserInt);
        this.refreshUserInt = null;
      }
      this.rootPage = user != null ? 'HomePage' : 'WelcomePage';
      this.pages.find((item) => item.page == 'ReportsPage').params = { user: user};
    },
    err => console.log(err));

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.authentication.checkLogin();

    });
  }

  openPage($ev, page) {

    console.log('open page', page, $ev);
    this.nav.setRoot(page.page, page.params);
    //this.nav.setRoot(page.component);
  }

  logout() {
    this.authentication.logout();
  }

  ionViewDidLoad() {
    console.log('App component loaded')
  }
}
