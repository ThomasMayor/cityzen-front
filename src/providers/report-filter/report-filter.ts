import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DateFilter } from '../../models/filter';
import { ReportCategory } from '../../models/report';
/*
  Generated class for the ReportFilterProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReportFilterProvider {

  private _dateFilter: DateFilter = DateFilter.year;
  private _categoryFilter: ReportCategory|null = null;

  private dateFilter = new BehaviorSubject(this._dateFilter);
  private categoryFilter = new BehaviorSubject(this._categoryFilter);

  public dateFilter$: Observable<DateFilter> = this.dateFilter.asObservable();
  public categoryFilter$: Observable<ReportCategory|null> = this.categoryFilter.asObservable();

  constructor() {

  }

  setDateFilter(value: DateFilter) {
    if (value !== this._dateFilter)
    {
      this._dateFilter = value;
      this.dateFilter.next(value);
    }
  }

  setCategoryFilter(value: ReportCategory|null) {
    if (value !== this._categoryFilter)
    {
      this._categoryFilter = value;
      this.categoryFilter.next(value);
    }
  }

}
