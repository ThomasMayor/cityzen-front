import { Component, Input, Output, EventEmitter } from '@angular/core';
import {} from '@types/googlemaps';
import { Geoposition } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import { IReport, ReportCategory, reportCategoryHelper } from '../../models/report';
import { ReportProvider } from '../../providers/report/report';
import { GeoLocationProvider } from '../../providers/geo-location/geo-location';
import { ReportPreviewPage } from '../../pages/report-preview/report-preview';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';


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

  @Output()
  reportClick: EventEmitter<any> = new EventEmitter<any>();


  private readonly MAP_PIN:string = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
  private readonly MAP_PIN_2:string = 'M25 0c-8.284 0-15 6.656-15 14.866 0 8.211 15 35.135 15 35.135s15-26.924 15-35.135c0-8.21-6.716-14.866-15-14.866zm-.049 19.312c-2.557 0-4.629-2.055-4.629-4.588 0-2.535 2.072-4.589 4.629-4.589 2.559 0 4.631 2.054 4.631 4.589 0 2.533-2.072 4.588-4.631 4.588z';
  private map: google.maps.Map;
  private userMarker: google.maps.Marker;
  private watch: Observable<Geoposition>;
  private markerIndex: number = 0;
  private markers: Array<google.maps.Marker> = [];
  private markerCluster: MarkerClusterer;
  public initialized: boolean = false;

  constructor(private toastCtrl: ToastController,
              private reportProvider: ReportProvider,
              private mapProvider: GoogleMapsProvider,
              private geoLocationProvider: GeoLocationProvider) {
  }

  public init(centerOnUser: boolean, latitude?:number, longitude?:number, zoom:number=12): Promise<any> {
    console.log('map init ', centerOnUser, latitude, longitude);
    let mapInit = false;
    return new Promise<any>((resolve, reject) => {

      this.mapProvider.mapInitialized$.subscribe(
        (initialized) => {
          this.initialized = initialized;
          if (initialized) {
            if (!centerOnUser) {
              this.initMap(latitude, longitude, zoom);
              mapInit = true;
              this.map.addListener('click', (e) => this.onMapClick(e))
              resolve();
            }
            this.geoLocationProvider.position$.subscribe((location:Geoposition) => {
              if (!location)
                return;
              if (centerOnUser && !mapInit) {
                this.initMap(location.coords.latitude, location.coords.longitude, zoom);
                mapInit = true;
                this.map.addListener('click', (e) => this.onMapClick(e))
                this.initUserMarker(location.coords.latitude, location.coords.longitude);
                resolve();
              }
              if (centerOnUser) {
                this.userMarker.setPosition(new google.maps.LatLng(location.coords.latitude, location.coords.longitude))
              }
            })
            /**/
            /*
            this.geolocation.getCurrentPosition().then((resp) => {
              if (centerOnUser)
                this.initMap(resp.coords.latitude, resp.coords.longitude, zoom);
              this.map.addListener('click', (e) => this.onMapClick(e))
              this.initUserMarker(resp.coords.latitude, resp.coords.longitude);
              this.watch = this.geolocation.watchPosition();
              this.watch.filter((p) => p.coords !== undefined)
                        .subscribe((resp) => { this.userMarker.setPosition(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)) });

              resolve();
            }).catch((err) => { this.handleError(err); })
              .then(err => reject(err));*/
          }
        },
        (err) => reject(err)
      )

    })
  }

  private onMapClick(e) {
    console.log('map click', e);
    let report:IReport = {
      _id: null,
      approved: [],
      created: null,
      description: "Description\ndu\nconstat",
      disapproved: [],
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
      pictures: [],
      title: 'Titre du constat un peu long',
      _creator: null,
      place: '123 Route de Meyrin, 1202 Genève',
      category: <ReportCategory>Math.floor(Math.random() * ReportCategory.Last)
    }
    this.addMarker(e.latLng.lat(), e.latLng.lng(), reportCategoryHelper.getColor(report.category), report);
    this.reportProvider.insert(report).subscribe(
      data => {
        console.log('Report inserted', data)
      },
      err => { console.log('Error while inserting report', err) }
    );
  }

  private initMap(latitude:number, longitude:number, zoom: number) {
    console.log('initMap');
    this.map = new google.maps.Map(document.getElementById(`map_canvas_${this.mapId}`), {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: zoom,
      maxZoom: 20,
      clickableIcons: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        style: google.maps.ZoomControlStyle.DEFAULT
      }
    });
    this.markerCluster = new MarkerClusterer(this.map, this.markers, {imagePath: '/assets/img/m'});
  }

  private onMarkerClick(e:google.maps.MouseEvent, marker:any) {
    this.showReport(marker.data);
  }

  private showReport(report: IReport) {
    console.log('emitting event', report)
    this.reportClick.emit(report);
  }

  private handleError(error) {
    console.log('Error', error, this.toastCtrl);
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
      scale: 8,
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

  public addMarker(lat:number, long:number, color:string, data: any) {
    //console.log('addMarker', lat, long, data)
    let icon = {
      path: this.MAP_PIN_2,
      anchor: new google.maps.Point(25,50),
      fillColor: /*'#039be5' */color,
      fillOpacity: 0.8,
      scale: 0.8,
      strokeColor: 'white',
      strokeWeight: 2,
    };
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      icon: icon
    });
    (<any>marker).data = data;
    marker.addListener('click', ev => this.onMarkerClick(ev, marker))
    this.markers.push(marker);
    this.markerCluster.addMarkers([marker], false);
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
