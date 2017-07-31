import { NgModule } from '@angular/core';
import { ReportCategoryPipe } from '../pipes/report-category/report-category';
import { DatePipe } from '../pipes/date/date';
@NgModule({
	declarations: [
		ReportCategoryPipe,
		DatePipe,
	],
	imports: [],
	exports: [
		ReportCategoryPipe,
		DatePipe
	]
})
export class PipesModule {}
