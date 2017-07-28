import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IReport } from '../../models/report';
import { MapComponent } from '../../components/map/map';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';

/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  @ViewChild(MapComponent)
  private map: MapComponent;


  private report:IReport;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleMapsProvider: GoogleMapsProvider) {
    this.report = this.navParams.get('report');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad', this.report, this.map)
    this.googleMapsProvider.mapInitialized$.subscribe((initialized) => {
      if (initialized) {
        console.log('before init')
        this.map.init(false, this.report.latitude, this.report.longitude);
        this.map.addMarker(this.report.latitude, this.report.longitude, '', {});
        console.log('after init')
      }
    })
  }

  reportClick(report) {
    console.log('ReportPage.reportClick', report)
  }


}
