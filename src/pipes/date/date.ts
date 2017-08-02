import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'mydate',
})
export class DatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, mode: string = 'full',...args) {
    let date = new Date(value);
    let month = '';
    switch(date.getMonth()) {
      case 0 : month = 'janvier'; break;
      case 1 : month = 'février'; break;
      case 2 : month = 'mars'; break;
      case 3 : month = 'avril'; break;
      case 4 : month = 'mai'; break;
      case 5 : month = 'juin'; break;
      case 6 : month = 'juillet'; break;
      case 7 : month = 'août'; break;
      case 8 : month = 'septembre'; break;
      case 9 : month = 'octobre'; break;
      case 10 : month = 'novembre'; break;
      case 11 : month = 'décembre'; break;
    }
    if (mode == 'month')
      month = month.charAt(0).toUpperCase() + month.slice(1);
    let ret = `${month} ${date.getFullYear()}`;
    if (mode == 'full')
      ret = `${date.getDate()}${date.getDate() == 1 ? "er" : ""} ` + ret;

    //console.log('DatePipe', value, ret);
    return ret;
  }
}
