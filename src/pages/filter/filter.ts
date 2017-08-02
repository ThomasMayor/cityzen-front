import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DateFilter } from '../../models/filter';
import { ReportFilterProvider } from '../../providers/report-filter/report-filter';
import { ReportCategory, reportCategoryHelper } from '../../models/report';

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

  private _dateFilter: DateFilter;
  private _categoryFilter: ReportCategory|null;
  private reportCategoryHelper = reportCategoryHelper;

  constructor(private reportFilter: ReportFilterProvider) {
    this.reportFilter.dateFilter$.subscribe((filter) => { this._dateFilter = filter; });
    this.reportFilter.categoryFilter$.subscribe((filter) => { this._categoryFilter = filter; });
  }

  private get dateFilter(): DateFilter {
    return this._dateFilter;
  }

  private set dateFilter(filter:DateFilter) {
    this._dateFilter = filter;
    this.reportFilter.setDateFilter(this._dateFilter);
  }


  private get categoryFilter(): any {
    return this._categoryFilter === null ? 'null' : this._categoryFilter;
  }

  private set categoryFilter(filter:any) {
    this._categoryFilter = filter === 'null' ? null : filter;
    this.reportFilter.setCategoryFilter(this._categoryFilter);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

}
