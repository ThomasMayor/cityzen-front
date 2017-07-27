import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IReport } from '../../models/report';

/**
 * Generated class for the ReportPreviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-preview',
  templateUrl: 'report-preview.html',
})
export class ReportPreviewPage {
  private report: IReport
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.report = navParams.get('report');
    console.log(this.report);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPreviewPage');
  }

}
