import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";

import { ApiEndPointsProvider } from '../api-end-points/api-end-points';
import { IUser } from '../../models/user';
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  private authUser = new BehaviorSubject(null);
  public authUser$: Observable<IUser> = this.authUser.asObservable();

  constructor(private http: Http,
              public authHttp: AuthHttp,
              private endpoints: ApiEndPointsProvider,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelper) {
    console.log('Hello AuthenticationProvider Provider');
  }

  checkLogin() {
    this.storage.get('jwt').then(jwt => {
      console.log('checkLogin', jwt)
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        console.log('Not Expired', this.endpoints.auth);
        this.authHttp.get(this.endpoints.auth)
                     .map(res => res.json())
                     .map(jwt => this.handleJwtResponse(jwt))
                     .take(1)
                     .subscribe(
                       () => { console.log('checkLogin 2'); }
                     )
      }
      else {
        console.log('Expired');
        this.storage.remove('jwt').then(() => this.authUser.next(null));
      }
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.endpoints.login, credentials)
      .map(response => response.json())
      .map(jwt => this.handleJwtResponse(jwt));
  }

  logout() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
  }

  signup(user: IUser): Observable<any> {
    return this.http.post(this.endpoints.signup, user)
      .map(response => response.json())
      .map(jwt => {
        this.handleJwtResponse(jwt)
      });
  }

  private handleJwtResponse(jwt: any): Promise<string> {
    console.log('handleJwtResponse', jwt);
    if (!jwt.success)
      throw Observable.throw(jwt.message);
    return this.storage.set('jwt', jwt.token)
      .then(() => this.authUser.next(this.jwtHelper.decodeToken(jwt.token)))
      .then(() => jwt.token);
  }
}
