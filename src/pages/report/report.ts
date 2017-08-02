import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { IReport, reportCategoryHelper } from '../../models/report';
import { IUser } from '../../models/user';
import { MapComponent } from '../../components/map/map';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { ReportProvider } from '../../providers/report/report';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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
  private showMap:boolean = true;
  private user: IUser = null;
  private reportCategoryHelper = reportCategoryHelper;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleMapsProvider: GoogleMapsProvider,
              private authProvider: AuthenticationProvider,
              private toastCtrl: ToastController,
              private reportProvider: ReportProvider) {
    this.report = this.navParams.get('report');
    this.authProvider.authUser$.subscribe((user) => { this.user = user; });
  }

  get opinionGiven(): boolean {
    return this.report._creator._id == this.user._id || this.approves || this.disapproves;
  }

  get approves(): boolean {
    return this.report.approved.findIndex((id) => this.user._id == id) > -1
  }

  get disapproves(): boolean {
    return this.report.disapproved.findIndex((id) => this.user._id == id) > -1
  }

  get opinion(): string {
    let op = '';
    if (this.approves)
      op = 'Vous approuvez';
    else if (this.disapproves)
      op = 'Vous désapprouvez';
    return op;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad', this.report, this.map)
    this.googleMapsProvider.mapInitialized$.subscribe((initialized) => {
      if (initialized) {
        console.log('before init')
        this.map.init(false, this.report.latitude, this.report.longitude, 16);
        this.map.addMarker(this.report.latitude, this.report.longitude, reportCategoryHelper.getColor(this.report.category), {});
        console.log('after init')
      }
    })
  }

  approve() {
    console.log('approve clicked')
    this.report.approved.push(this.user._id);
    this.reportProvider.approve(this.report).subscribe(
      (data) => {
        console.log('report approve response', data);
        if (!data.success) {
          this.report.approved.pop();
          this.showToast('Une erreur est survenue, veuillez réessayer');
        }
      },
      (err) => {
        this.report.approved.pop();
        this.showToast('Une erreur est survenue, veuillez réessayer');
        console.log('report approve error', err);
      }
    )
  }

  disapprove() {
    console.log('disapprove clicked');
    this.report.disapproved.push(this.user._id);
    this.reportProvider.disapprove(this.report).subscribe(
      (data) => {
        console.log('report disapprove response', data);
        if (!data.success) {
          this.report.disapproved.pop();
          this.showToast('Une erreur est survenue, veuillez réessayer');
        }
      },
      (err) => {
        this.report.disapproved.pop();
        this.showToast('Une erreur est survenue, veuillez réessayer');
        console.log('report adispprove error', err);
      }
    );
  }

  reportClick(report) {
    console.log('ReportPage.reportClick', report)
  }

  setShowMap(show:boolean) {
    this.showMap = show;
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      closeButtonText: 'Fermer',
      showCloseButton: true
    });
    toast.present();
  }

  showProfile(user) {
    console.log('profile click');
    this.navCtrl.push('ProfilPage', { user: user});
  }

}
