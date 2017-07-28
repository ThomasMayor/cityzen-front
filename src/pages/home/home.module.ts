import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MapComponentModule } from '../../components/map/map.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MapComponentModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
