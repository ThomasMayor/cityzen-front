import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPage } from './report';
import { MapComponentModule } from '../../components/map/map.module';
//import { DatePipe } from '../../pipes/date/date';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    ReportPage,
    //DatePipe
  ],
  imports: [
    MapComponentModule,
    IonicPageModule.forChild(ReportPage),
    PipesModule,
  ],
  exports: [
    ReportPage
  ],
  providers: [
    //DatePipe
  ]
})
export class ReportPageModule {}
