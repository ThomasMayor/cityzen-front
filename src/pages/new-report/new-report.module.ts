import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewReportPage } from './new-report';
import { Camera } from '@ionic-native/camera';
import { FormMessageComponentModule }  from '../../components/form-message/form-message.module';


@NgModule({
  declarations: [
    NewReportPage,
  ],
  imports: [
    IonicPageModule.forChild(NewReportPage),
    FormMessageComponentModule,
  ],
  providers: [
    Camera,
  ]
})
export class NewReportPageModule {}
