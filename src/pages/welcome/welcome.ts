import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Content } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication'
/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  @ViewChild(Content) content: Content;

  showSignup :boolean = false;
  showLogin:boolean = false;

  constructor(private authentication: AuthenticationProvider) {

  }

  login() {
    if (!this.showLogin) {
      this.showLogin = true;
      setTimeout(() => { this.content.scrollToBottom(300) }, 1);
    }
    this.showSignup = false;
  }

  signup() {
    if (!this.showSignup) {
      this.showSignup = true;
      setTimeout(() => { this.content.scrollToBottom(300) }, 1);
    }
    this.showLogin = false;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }



}
