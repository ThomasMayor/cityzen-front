import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SmartImagePickerComponent } from './smart-image-picker';
import { Camera } from '@ionic-native/camera';

@NgModule({
	declarations: [
		SmartImagePickerComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		SmartImagePickerComponent
	],
	providers: [
		Camera
	]
})
export class SmartImagePickerComponentModule {}
