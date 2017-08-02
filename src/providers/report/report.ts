import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";

import { ApiEndPointsProvider } from '../api-end-points/api-end-points';
import { IReport, ReportCategory } from '../../models/report';
import { DateFilter } from '../../models/filter';
/*
  Generated class for the ReportProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReportProvider {

  private reports = new BehaviorSubject<IReport[]>([]);
  public reports$: Observable<IReport[]> = this.reports.asObservable();

  constructor(public http: Http,
              public authHttp: AuthHttp,
              private endpoints: ApiEndPointsProvider,) {
    console.log('Hello ReportProvider Provider');
  }

  insert(report: IReport): Observable<any> {
    return this.authHttp.post(this.endpoints.reports, report)
      .map(response => response.json())
  }

  approve(report: IReport): Observable<any> {
    let url = this.endpoints.reportApprove.replace(/\:rid/g, report._id);
    console.log('ReportProvider.approve', report, url);
    return this.authHttp.post(url, {})
                        .map(response => response.json())
                        .take(1);
  }

  disapprove(report: IReport): Observable<any> {
    let url = this.endpoints.reportDisapprove.replace(/\:rid/g, report._id);
    console.log('ReportProvider.approve', report, url);
    return this.authHttp.post(url, {})
                        .map(response => response.json())
                        .take(1);
  }

  loadAll(filters:any): Promise<any[]> {
    console.log('load all reports', filters);
    return new Promise((resolve, reject) => {
      if (filters.categoryFilter === null)
        delete filters.categoryFilter;
      this.authHttp.get(this.endpoints.reports, { params: filters})
                   .map(res => res.json())
                   .take(1)
                   .subscribe(
                     data => {
                       console.log('Reports loaded', data)
                       this.reports.next(data);
                       resolve(data);
                     },
                     err => reject(err)
                   );
    })

  }

  loadByUserId(uid: string): Observable<any> {
    return this.authHttp
               .get(this.endpoints.reports + '/byuser/' + uid)
                 .map(res => res.json())
                 .take(1);
  }
}
