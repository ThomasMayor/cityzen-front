import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { MapComponent } from '../../components/map/map';
import { ReportProvider } from '../../providers/report/report';
import { IReport } from '../../models/report';
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
              private reportProvider: ReportProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.map.init().then(_ => {
      this.reportProvider.loadAll().then(reports => {
        console.log('report loaded', reports);
        reports.forEach(report => this.map.addMarker(report.latitude, report.longitude, '', report.title, report));
      });
    });

  }

  displayReport(report: IReport) {
    console.log('Should display', report);
  }
}
