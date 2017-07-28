import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Events } from 'ionic-angular';
import { JwtHelper, AuthConfig, AuthHttp } from "angular2-jwt";
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { Storage, IonicStorageModule} from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormBuilder } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';

import { ApiEndPointsProvider } from '../providers/api-end-points/api-end-points';
import { ConfigProvider } from '../providers/config/config';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { FormMessageProvider } from '../providers/form-message/form-message';
import { UserProvider } from '../providers/user/user';
import { ReportProvider } from '../providers/report/report';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { MapComponentModule } from '../components/map/map.module';


// Auth Factory
export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
      name: 'myapp',
      driverOrder: ['localstorage']
    }),
    MapComponentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiEndPointsProvider,
    ConfigProvider,
    AuthenticationProvider,
    JwtHelper,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    FormBuilder,
    FormMessageProvider,
    UserProvider,
    Geolocation,
    ReportProvider,
    Events,
    GoogleMapsProvider
  ]
})
export class AppModule {}
