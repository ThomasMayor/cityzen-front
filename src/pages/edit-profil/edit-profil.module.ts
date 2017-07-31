import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilPage } from './edit-profil';
import { FormMessageComponentModule }  from '../../components/form-message/form-message.module';
import { SmartImagePickerComponentModule }  from '../../components/smart-image-picker/smart-image-picker.module';


@NgModule({
  declarations: [
    EditProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfilPage),
    FormMessageComponentModule,
    SmartImagePickerComponentModule,
  ],
  providers: [
  ]
})
export class NewReportPageModule {}
