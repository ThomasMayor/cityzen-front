import { NgModule } from '@angular/core';
import { ReportCategoryPipe } from '../pipes/report-category/report-category';
import { DatePipe } from '../pipes/date/date';
import { GroupByMonthPipe } from './group-by-month/group-by-month';
@NgModule({
	declarations: [
		ReportCategoryPipe,
		DatePipe,
    GroupByMonthPipe,
	],
	imports: [],
	exports: [
		ReportCategoryPipe,
		DatePipe,
    GroupByMonthPipe
	]
})
export class PipesModule {}
