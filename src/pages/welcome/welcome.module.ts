import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { FormMessageComponentModule }  from '../../components/form-message/form-message.module';
import { LoginComponentModule }  from '../../components/login/login.module';
import { SignupComponentModule }  from '../../components/signup/signup.module';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    FormMessageComponentModule,
    LoginComponentModule,
    SignupComponentModule,
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomePageModule {}
