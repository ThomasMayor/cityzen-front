import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
/*
  Generated class for the ApiEndPointsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiEndPointsProvider {

  API_URL: string;
  USER_PATH: string = '/api/users';

  constructor(public config: ConfigProvider) {
    this.API_URL = this.config.API_URL;
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

  get users(): string {
    return this.API_URL + this.USER_PATH;
  }



}
