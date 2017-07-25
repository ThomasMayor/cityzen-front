import { Injectable } from '@angular/core';
import { IConfigProvider } from './iconfig'
/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConfigProvider implements IConfigProvider {

    get API_URL(): string {
      return "http://localhost:8080";
    }

    get GOOGLE_API_KEY() : string {
      return 'AIzaSyDw4GTGJsbwwcxyYnEbigb0D1uBwTzqDRE';
    }

}
