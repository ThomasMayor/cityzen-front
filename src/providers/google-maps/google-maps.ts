import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigProvider } from '../config/config';
/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GoogleMapsProvider {

  private mapInitialized = new BehaviorSubject<boolean>(false);
  public mapInitialized$ = this.mapInitialized.asObservable();

  constructor(private config: ConfigProvider) {
    console.log('Hello GoogleMapsProvider Provider');
    window['mapInit'] = () => { this.onMapInitialized(); }
    this.initializeScripts();
  }

  initializeScripts() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =`https://maps.googleapis.com/maps/api/js?key=${this.config.GOOGLE_API_KEY}&language=fr&callback=mapInit`;
    script.defer = true;
    script.async = true;
    script.id = "googleMaps";
    document.body.appendChild(script);
  }

  onMapInitialized() {
    this.mapInitialized.next(true);
  }

}
