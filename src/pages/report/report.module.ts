import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPage } from './report';
import { MapComponentModule } from '../../components/map/map.module';

@NgModule({
  declarations: [
    ReportPage,
  ],
  imports: [
    MapComponentModule,
    IonicPageModule.forChild(ReportPage),
  ],
  exports: [
    ReportPage
  ]
})
export class ReportPageModule {}
