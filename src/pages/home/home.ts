import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController, AlertController, PopoverController} from 'ionic-angular';
import { MapComponent } from '../../components/map/map';
import { ReportProvider } from '../../providers/report/report';
import { IReport, reportCategoryHelper, ReportCategory } from '../../models/report';
import { DateFilter } from '../../models/filter';
import { ReportFilterProvider } from '../../providers/report-filter/report-filter';
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

  private _dateFilter:DateFilter;
  private _categoryFilter:ReportCategory|null;
  private autoRefreshReports: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private reportProvider: ReportProvider,
              public modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private popoverCtrl: PopoverController,
              private reportFilter: ReportFilterProvider) {
    this.autoRefreshReports = false;
    this.reportFilter.categoryFilter$.subscribe((filter) => {
      this.categoryFilter = filter;
    })
    this.reportFilter.dateFilter$.subscribe((filter) => {
      this.dateFilter = filter;
    })
    this.autoRefreshReports = true;
  }

  private set dateFilter(filter:DateFilter) {
    console.log('set dateFilter', filter, this._dateFilter)
    if (this._dateFilter !== filter) {
      this._dateFilter = filter;
      if (this.autoRefreshReports)
        this.refreshReports();
    }
  }

  private set categoryFilter(filter:ReportCategory|null) {
    console.log('set categoryFilter', filter, this._categoryFilter)
    if (this._categoryFilter !== filter) {
      this._categoryFilter = filter;

      if (this.autoRefreshReports)
        this.refreshReports();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage', this.map);
    this.map.init(true).then(_ => {
      this.refreshReports();

    });
  }

  refreshReports() {
    this.reportProvider.loadAll({dateFilter: this._dateFilter, categoryFilter: this._categoryFilter}).then(reports => {
      this.map.clearMarkers();
      reports.forEach(report => this.map.addMarker(report.latitude, report.longitude, reportCategoryHelper.getColor(report.category), report));
    });
  }

  moreClick(e) {
    console.log('moreClick', e)
    this.popoverCtrl.create('FilterPage').present({ev: e});
  }

  mapClick(e) {
    let addModal = this.modalCtrl.create('NewReportPage', {test: {lat: e.latLng.lat(),
                                                           lng: e.latLng.lng(),
                                                          created: new Date(Math.round(Math.random() * 49935600000) + 1451602800000)   }});
    addModal.onDidDismiss(item => {
      if (item) {
        console.log('New report : ', item)
      }
      else
        console.log('No new report');
    })
    addModal.present();
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
