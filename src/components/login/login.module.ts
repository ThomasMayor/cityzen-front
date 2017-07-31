import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoginComponent } from './login';
import { FormMessageComponentModule } from '../form-message/form-message.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    IonicModule,
    FormMessageComponentModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginComponentModule {}
