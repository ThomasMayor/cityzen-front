import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateFilter } from '../../models/filter';

/**
 * Generated class for the FilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  private dateFilter: DateFilter;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dateFilter = this.navParams.get('filter');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

}
