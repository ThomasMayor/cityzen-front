import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable, BehaviorSubject } from 'rxjs';
/*
  Generated class for the GeoLocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeoLocationProvider {

  private position = new BehaviorSubject(null);
  public position$:Observable<Geoposition> = this.position.asObservable();
  private watch: Observable<Geoposition>;

  constructor(private geolocation: Geolocation) {
    console.log('Hello GeoLocationProvider Provider');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Current position', resp)
      this.position.next(resp);
      this.watch = this.geolocation.watchPosition();
      this.watch.filter((p) => p.coords !== undefined)
                .subscribe(
                  (resp) => {
                    this.position.next(resp);
                  }
                );

    }).catch((err) => {
      // TODO : display error
      console.log('Geolocation error');
    });
  }

}
