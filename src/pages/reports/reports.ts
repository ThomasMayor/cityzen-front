import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IUser } from '../../models/user';
import { IReport, reportCategoryHelper } from '../../models/report';
import { ReportProvider } from '../../providers/report/report';
import { CoreController } from '../../core/core-controller';

/**
 * Generated class for the ReportsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage extends CoreController {

  private user:IUser;
  private reports: IReport[] = [];
  private reportCategoryHelper = reportCategoryHelper;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private reportProvider: ReportProvider,
              public toastCtrl: ToastController) {
    super(toastCtrl);
    this.user = navParams.get('user');
    if (this.user) {
      this.reportProvider
          .loadByUserId(this.user._id)
          .subscribe(
            (reports) => {
              this.reports = reports;
            },
            (err) => {
              console.log('Error while loading reports', err);
              this.showToast('Impossible de charger les constats, veuillez ressayer.');
            }
          );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  showReport(report) {
    this.navCtrl.push('ReportPage', { report: report});
  }

}
