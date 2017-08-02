import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IUser, userScore } from '../../models/user';
/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  private user: IUser
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  get profileImageStyle(): string {
    if (!this.user.profilePicture)
      return `url('../assets/img/noprofilepic.png')`;
    return `url(${this.user.profilePicture})`;
  }

  get score(): number {
    return userScore.compute(this.user);
  }
}
