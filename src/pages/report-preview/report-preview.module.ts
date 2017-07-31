import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPreviewPage } from './report-preview';
import { DatePipe } from '../../pipes/date/date';


@NgModule({
  declarations: [
    ReportPreviewPage,
    DatePipe
  ],
  imports: [
    IonicPageModule.forChild(ReportPreviewPage),
  ],
  exports: [
    ReportPreviewPage
  ],
  providers: [
    DatePipe
  ]
})
export class ReportPreviewPageModule {}
