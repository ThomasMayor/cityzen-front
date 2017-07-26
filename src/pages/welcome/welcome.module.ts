import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { LoginComponent } from '../../components/login/login';
import { SignupComponent } from '../../components/signup/signup';
import { FormMessageComponent }  from '../../components/form-message/form-message';

@NgModule({
  declarations: [
    WelcomePage,
    LoginComponent,
    SignupComponent,
    FormMessageComponent,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomePageModule {}
