import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPreviewPage } from './report-preview';


@NgModule({
  declarations: [
    ReportPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportPreviewPage),
  ],
  exports: [
    ReportPreviewPage
  ]
})
export class ReportPreviewPageModule {}
