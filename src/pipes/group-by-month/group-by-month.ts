import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/toArray';
/**
 * Generated class for the GroupByMonthPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'groupByMonth',
  pure: false,
})
export class GroupByMonthPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    let results = [];
    Observable.from(value).groupBy(
      (item:any)=> {
        let valueDate = new Date(item.created);
        return new Date(valueDate.getFullYear(), valueDate.getMonth()).toISOString();
      },
      (item:any)=> { return item })
      .flatMap(group => group.toArray())
      .subscribe((data)=>{

        let valueDate = new Date(data[0].created);
        let groupDate = new Date(valueDate.getFullYear(), valueDate.getMonth());
        results.push({value:groupDate,list:data});
      })
    //console.log('GroupByMonthPipe results', results);
    return results;
  }
}
