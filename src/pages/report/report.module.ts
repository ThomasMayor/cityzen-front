import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPage } from './report';
import { MapComponentModule } from '../../components/map/map.module';
import { DatePipe } from '../../pipes/date/date';

@NgModule({
  declarations: [
    ReportPage,
    DatePipe
  ],
  imports: [
    MapComponentModule,
    IonicPageModule.forChild(ReportPage),
  ],
  exports: [
    ReportPage
  ],
  providers: [
    DatePipe
  ]
})
export class ReportPageModule {}
