import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";

import { ApiEndPointsProvider } from '../api-end-points/api-end-points';
import { IReport } from '../../models/report';
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

  loadAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(this.endpoints.reports)
                   .map(res => res.json())
                   .take(1)
                   .subscribe(
                     data => {
                       this.reports.next(data);
                       resolve(data);
                     },
                     err => reject(err)
                   );
    })

  }
}
