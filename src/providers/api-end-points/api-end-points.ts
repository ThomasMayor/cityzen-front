import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
/*
  Generated class for the ApiEndPointsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiEndPointsProvider {

  readonly API_URL: string;
  readonly USER_PATH: string = '/api/users';
  readonly REPORT_PATH: string = '/api/reports';

  constructor(public config: ConfigProvider) {
    this.API_URL = this.config.API_URL;
  }

  get users(): string {
    return this.API_URL + this.USER_PATH;
  }

  get reports(): string {
    return this.API_URL + this.REPORT_PATH;
  }

  get reportApprove(): string {
    return this.reports + '/:rid/approve';
  }

  get reportDisapprove(): string {
    return this.reports + '/:rid/disapprove';
  }

  get auth():string {
    return this.users + `/isauth`;
  }

  get login():string {
    return this.users + `/auth`;
  }

  get signup():string {
    return this.users + "/signup";
  }





}
