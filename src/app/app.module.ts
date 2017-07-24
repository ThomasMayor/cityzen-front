import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { JwtHelper, AuthConfig, AuthHttp } from "angular2-jwt";
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { Storage, IonicStorageModule} from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormBuilder } from '@angular/forms';

import { MyApp } from './app.component';

import { ApiEndPointsProvider } from '../providers/api-end-points/api-end-points';
import { ConfigProvider } from '../providers/config/config';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { FormMessageProvider } from '../providers/form-message/form-message';


// Auth Factory
export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => { console.log('tokenGetter'); return storage.get('jwt'); }),
  });
  console.log('authHttpServiceFactory');
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
    FormMessageProvider
  ]
})
export class AppModule {}
