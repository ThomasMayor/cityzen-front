import { Component, Input } from '@angular/core';
import {} from '@types/googlemaps';
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

  private map: google.maps.Map;

  constructor() {
    console.log('Hello MapComponent Component');
  }

  public init(lat:number, long:number, zoom:number=12) {
    console.log('MapComponent:init ' + this.mapId);
    this.map = new google.maps.Map(document.getElementById(`map_canvas_${this.mapId}`),
                                   {
                                     center: new google.maps.LatLng(lat, long),
                                     zoom: zoom,
                                     mapTypeId: google.maps.MapTypeId.ROADMAP
                                    });
  }

  public addMarker(lat:number, long:number, title:string) {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      title: title
    });
    marker.setMap(this.map);
  }
}
