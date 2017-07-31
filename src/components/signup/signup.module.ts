import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SignupComponent } from './signup';
import { FormMessageComponentModule } from '../form-message/form-message.module';

@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    IonicModule,
    FormMessageComponentModule,
  ],
  exports: [
    SignupComponent
  ]
})
export class SignupComponentModule {}
