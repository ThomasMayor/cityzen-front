import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController, AlertController, PopoverController} from 'ionic-angular';
import { MapComponent } from '../../components/map/map';
import { ReportProvider } from '../../providers/report/report';
import { IReport, reportCategoryHelper } from '../../models/report';
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
              private reportProvider: ReportProvider,
              public modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage', this.map);
    this.map.init(true).then(_ => {
      this.reportProvider.loadAll().then(reports => {
        reports.forEach(report => this.map.addMarker(report.latitude, report.longitude, reportCategoryHelper.getColor(report.category), report));
      });
    });
  }

  reportClick(report: IReport) {
    console.log('report click');
    /*let popover = this.popoverCtrl.create('ReportPreviewPage', { report: report });
    popover.present()*/
    this.alertCtrl.create({
      title: report.title,
      message: report.description,
      buttons: [
        {text: 'Fermer'},
        {
          text: 'Afficher',
          handler: data => {
            console.log('alert click', report);
            this.showReport(report);
          }
        }
      ]
    }).present();
 }

 showReport(report) {

    console.log('Should display', report);
    this.navCtrl.push('ReportPage', { report: report});
    /*let modal = this.modalCtrl.create('ReportPage', { report: report });
    modal.present();*/
  }

  addReport() {
    console.log('addReport');
    //this.navCtrl.push('NewReportPage');
    let addModal = this.modalCtrl.create('NewReportPage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log('New report : ', item)
      }
      else
        console.log('No new report');
    })
    addModal.present();
  }
}
