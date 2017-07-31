import { Pipe, PipeTransform } from '@angular/core';
import { ReportCategory } from '../../models/report';

/**
 * Generated class for the ReportCategoryPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'reportCategory',
})
export class ReportCategoryPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: ReportCategory, ...args) {
    switch(value) {
      case ReportCategory.Agriculture :
        return 'Agriculture';
      case ReportCategory.GreenSpaces :
        return 'Espaces Verts';
      case ReportCategory.SportAndYouth :
        return 'Jeunesse et Sports';
      case ReportCategory.UrbanFurniture :
        return 'Mobilier urbain';
      case ReportCategory.Transports :
        return 'Transports Publiques';
      case ReportCategory.Health :
        return 'Santé';
      case ReportCategory.Social :
        return 'Social';
      default :
        return 'Security';
    }
  }
}
