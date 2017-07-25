import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { MapComponent } from '../../components/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(MapComponent)
  private map: MapComponent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.geolocation.getCurrentPosition().then((resp) => {
        this.map.init(resp.coords.latitude, resp.coords.longitude)
        this.map.addMarker(resp.coords.latitude, resp.coords.longitude, 'Ma Position')
    }).catch((error) => {
        console.log('Error getting location', error);
        let toast = this.toastCtrl.create({
          message: error,
          closeButtonText: 'Fermer',
          showCloseButton: true
        });
        toast.present();
    });
  }
}
