import { Component, Input } from '@angular/core';
import {} from '@types/googlemaps';
import * as markercluster from 'js-marker-clusterer';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import { IReport } from '../../models/report';
import { ReportProvider } from '../../providers/report/report';
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {

  @Input()
  mapId: string;

  private readonly MAP_PIN:string = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
  private readonly MAP_PIN_2:string = 'M25 0c-8.284 0-15 6.656-15 14.866 0 8.211 15 35.135 15 35.135s15-26.924 15-35.135c0-8.21-6.716-14.866-15-14.866zm-.049 19.312c-2.557 0-4.629-2.055-4.629-4.588 0-2.535 2.072-4.589 4.629-4.589 2.559 0 4.631 2.054 4.631 4.589 0 2.533-2.072 4.588-4.631 4.588z';
  private map: google.maps.Map;
  private userMarker: google.maps.Marker;
  private watch: Observable<Geoposition>;
  private markerIndex: number = 0;
  private markers: Array<google.maps.Marker> = [];
  private markerCluster: MarkerClusterer;

  constructor(private geolocation: Geolocation,
              private toastCtrl: ToastController,
              private reportProvider: ReportProvider) {
    console.log('Hello MapComponent Component');
  }

  public init(zoom:number=12): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      console.log('MapComponent:init ' + this.mapId);
      this.geolocation.getCurrentPosition().then((resp) => {
          this.map = new google.maps.Map(document.getElementById(`map_canvas_${this.mapId}`), {
             center: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
             zoom: zoom,
             mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          console.log('what is mc ?', MarkerClusterer);
          //this.map.addListener('click', this.onMapClick);
          this.map.addListener('click', ev => this.onMapClick(ev));
          this.map.addListener('zoom_changed', ev => this.onZoomChanged(ev));
          this.initUserMarker(resp.coords.latitude, resp.coords.longitude);
          this.watch = this.geolocation.watchPosition();
          this.watch.filter((p) => p.coords !== undefined)
                    .subscribe((resp) => { this.userMarker.setPosition(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)) });
          resolve();
      }).catch(this.handleError)
        .then(err => reject(err));
    });

  }

  private onMapClick(e:google.maps.MouseEvent) {
    //this.addMarker(e.latLng.lat(), e.latLng.lng(), '', '');
  }

  private onMarkerClick(e:google.maps.MouseEvent, marker:any) {
    console.log('markerClick ', marker.index);
  }

  private onZoomChanged(e) {
    this.rebuildClusterer();

  }

  private handleError(error) {
    console.log('Error', error);
    let toast = this.toastCtrl.create({
      message: error.message ? error.message : error,
      closeButtonText: 'Fermer',
      showCloseButton: true
    });
    toast.present();
  }

  public initUserMarker(lat:number, long:number) {
    let icon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#039be5',
      fillOpacity: 0.8,
      scale: 10,
      strokeColor: 'white',
      strokeWeight: 2,
    };
    this.userMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      title: 'Votre position',
      icon: icon,
      map: this.map,
    });
    this.userMarker.setZIndex(1000);
  }

  public addMarker(lat:number, long:number, color:string, title:string, data: any) {

     let icon = {
       path: this.MAP_PIN_2,
       anchor: new google.maps.Point(25,50),
       fillColor: '#039be5',
       fillOpacity: 0.8,
       scale: 0.8,
       strokeColor: 'white',
       strokeWeight: 2,
     };
     let marker = new google.maps.Marker({
       position: new google.maps.LatLng(lat, long),
       title: title,
       icon: icon,
     /*  map: this.map,*/
     });
     (<any>marker).data = data;
     marker.addListener('click', ev => this.onMarkerClick(ev, marker))
     this.markers.push(marker);
     this.rebuildClusterer();


  }

  private rebuildClusterer() {
    console.log('rebuildClusterer', this);
    this.markerCluster = new MarkerClusterer(this.map, this.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  }

  public addMarker2(lat:number, long:number, color:string, title:string) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: 'Votre position',
        map: this.map,
      });
  }

}

export class MarkerColor {
  public static readonly Orange:any = { color: '', dark: ''};
}
