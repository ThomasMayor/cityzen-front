import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";

import { ApiEndPointsProvider } from '../api-end-points/api-end-points';
import { IUser } from '../../models/user';
import { UserProvider } from '../user/user';
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
              private authHttp: AuthHttp,
              private endpoints: ApiEndPointsProvider,
              private userProvider: UserProvider,
              private storage: Storage,
              private jwtHelper: JwtHelper) {
    console.log('Hello AuthenticationProvider Provider');
  }

  checkLogin() {
    this.storage.get('jwt').then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.authHttp.get(this.endpoints.auth)
                     .map(res => res.json())
                     .map(jwt => this.handleJwtResponse(jwt))
                     .take(1)
                     .subscribe(
                       () => { }
                     )
      }
      else {
        this.storage.remove('jwt').then(() => this.authUser.next(null));
      }
    });
  }

  signup(user: IUser): Observable<any> {
    return this.userProvider.create(user)
                            .map(jwt => { this.handleJwtResponse(jwt) });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.endpoints.login, credentials)
      .map(response => response.json())
      .map(jwt => this.handleJwtResponse(jwt));
  }

  logout() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
  }



  handleJwtResponse(jwt: any) {
    console.log('handleJwtResponse', jwt);
    if (!jwt.success)
      throw Observable.throw(jwt.message);
    this.storage.set('jwt', jwt.token)
      .then(() => this.authUser.next(this.jwtHelper.decodeToken(jwt.token)))
  }
}
