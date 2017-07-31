import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {} from '@types/googlemaps';
import { Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'rxjs';
import { GeoLocationProvider } from '../../providers/geo-location/geo-location';
/**
 * Generated class for the NewReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-report',
  templateUrl: 'new-report.html',
})
export class NewReportPage {

  private form: FormGroup;
  private pictures: string[] = [];

  @ViewChild('fileInput')
  private fileInput;

  @ViewChild('slides')
  private slides;

  private geocoder = new google.maps.Geocoder

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private platform: Platform,
              private formBuilder: FormBuilder,
              private camera : Camera,
              private geoLocationProvider: GeoLocationProvider) {

      this.form = this.formBuilder.group({
        title: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
        description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
        place: ['', Validators.required],
      });
      console.log('asking geolocation');
      this.geoLocationProvider.position$.subscribe(
        (location) => {
          if (!location)
            return;
          console.log('Current position', location)
          this.geocoder = new google.maps.Geocoder();
          this.geocoder.geocode({'location': {lat: location.coords.latitude, lng: location.coords.longitude}},
            (result, status) => {
              console.log('Geocoder result', result, status);
              if (status == google.maps.GeocoderStatus.OK) {
                this.form.controls['place'].setValue(result[0].formatted_address);
              }
              else {
                // TODO : display error
              }
            });
        },
        (err) => {
          // TODO : display error
          console.log('geo location error', err);
        }
      );

  }

  save() {
    console.log('save');
  }


  get showSlide(): boolean {
    return this.pictures.length == 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewReportPage');
  }

  removePicture() {
    let index = this.slides.getActiveIndex();
    if (index >= this.pictures.length)
      index = this.pictures.length - 1;
    console.log('Remove picture', index);
    this.pictures.splice(index, 1);
    this.slides.slidePrev(0); //workaround to prevent splides to become blank
  }

  getPicture() {
    console.log('slides?',this.slides);
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 800,
        targetHeight: 600
      }).then((data) => {
        this.addPicture(data);
      }, (err) => {
        console.log('Unable to take photo', err);
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      this.addPicture((readerEvent.target as any).result);
    };
    if (event.target.files.length)
      reader.readAsDataURL(event.target.files[0]);
  }

  async takePicture() {
    await this.platform.ready();

    try {
      let options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 800,
        targetWidth: 600
      }

      this.camera.getPicture(options).then(
          (imageData) => { /*this.imageSrc = 'data:image/jpeg;base64,' + imageData*/ console.log('getPicture', imageData); },
          (err) => console.log('getPicture Error', err));
    }
    catch (e) {
      console.log('Camera Exception', e);
    }
  }

  addPicture(data: string) {
    if (data.indexOf('data:image/') == -1) {
      data = 'data:image/jpeg;base64,' + data
    }
    let oriSize = data.length;
    /////////////////////////////////////

    let canvas = document.createElement('canvas');
  	if (canvas.getContext)
		{
  		let img = new Image();
  		img.onload = (imageEvent) => {
  			var ctx = canvas.getContext('2d');

    		var MAX_WIDTH = 800;
    		var MAX_HEIGHT = 600;

    		var width = img.width;
    		var height = img.height;

    		if (width > height) {
    		  if (width > MAX_WIDTH) {
    		    height *= MAX_WIDTH / width;
    		    width = MAX_WIDTH;
    		  }
    		} else {
    			if (height > MAX_HEIGHT) {
	    		    width *= MAX_HEIGHT / height;
	    		    height = MAX_HEIGHT;
    			}
    		}

    		canvas.width = width;
    		canvas.height = height;

    		ctx.drawImage(img, 0, 0, width, height);
        data = canvas.toDataURL('image/jpeg');

        console.log(`Image size diff from ${oriSize} to ${data.length}`)
        //add to slide
        this.pictures.push(data);
        this.slides.update();
        setTimeout(_ => {
          this.slides.update();
          if (this.pictures.length > 1) {
            this.slides.slideTo(this.pictures.length, 300, true);
            this.slides.update();
          }
        }, 100);
  		};
  		img.src = data;
		}




    ////////////////////////////////

  }

}
