import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {} from '@types/googlemaps';
import { Geoposition } from '@ionic-native/geolocation';
import { Observable, Subscription } from 'rxjs';
import { GeoLocationProvider } from '../../providers/geo-location/geo-location';
import { ReportProvider } from '../../providers/report/report';
import { reportCategoryHelper, ReportCategory, IReport } from '../../models/report';
import { ToastController } from 'ionic-angular';
import { SmartImagePickerComponent } from '../../components/smart-image-picker/smart-image-picker';
/**
 * Generated class for the NewReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profil',
  templateUrl: 'edit-profil.html',
})
export class EditProfilPage {

  private form: FormGroup;
  private pictures: string[] = [];

  @ViewChild(SmartImagePickerComponent)
  private imagepicker: SmartImagePickerComponent;

  @ViewChild('fileInput')
  private fileInput;

  @ViewChild('slides')
  private slides;
  private reportCategoryHelper = reportCategoryHelper;
  private geocoder = new google.maps.Geocoder;
  private ReportCategory = ReportCategory;
  private geoLocationSub: Subscription;
  private location: {latitude:number, longitude: number};

  get showSlide(): boolean {
    return this.pictures.length == 0;
  }

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private platform: Platform,
              private formBuilder: FormBuilder,
              private camera : Camera,
              private geoLocationProvider: GeoLocationProvider,
              private toastCtrl: ToastController,
              private reportProvider: ReportProvider) {
      this.form = this.formBuilder.group({
        title: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
        description: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])],
        place: ['', Validators.required],
        category: ['', Validators.required]
      });
      this.geoLocationProvider.serviceAvailable$.subscribe(
        (available) => {
          if (available === false)
            this.showToast('Impossible de géolocaliser votre emplacement. Veuillez réessayer.')
        }
      );
      console.log('geo loc subs')
      this.geoLocationSub = this.geoLocationProvider.position$.subscribe(
        (location) => {
          if (!location)
            return;
          console.log('into geo loc subs')
          this.location = { latitude: location.coords.latitude, longitude: location.coords.longitude };
          if (this.geoLocationSub)
            this.geoLocationSub.unsubscribe();
          this.geocoder = new google.maps.Geocoder();
          this.geocoder.geocode({'location': {lat: location.coords.latitude, lng: location.coords.longitude}},
            (result, status) => {
              console.log('Geocoder result', result, status);
              if (status == google.maps.GeocoderStatus.OK) {
                this.form.controls['place'].setValue(result[0].formatted_address);
              }
              else {
                this.showToast('Impossible de géolocaliser votre emplacement. Veuillez réessayer.')
              }
            });
        }
      );
      console.log('geo loc subs done', this.geoLocationSub)
      if (this.location)
        this.geoLocationSub.unsubscribe();
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      closeButtonText: 'Fermer',
      showCloseButton: true
    });
    toast.present();
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

/*
  getPicture() {
    if (this.pictures.length >= 5)
      return;
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
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 800,
        targetWidth: 600
      }

      this.camera.getPicture(options).then(
          (imageData) => { console.log('getPicture', imageData); },
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
    //resize image
    let canvas = document.createElement('canvas');
  	if (canvas.getContext)
		{
  		let img = new Image();
  		img.onload = (imageEvent) => {
  			let ctx = canvas.getContext('2d');

    		const MAX_WIDTH = 800;
    		const MAX_HEIGHT = 600;

    		let width = img.width;
    		let height = img.height;

    		if (width > height) {
    		  if (width > MAX_WIDTH) {
    		    height *= MAX_WIDTH / width;
    		    width = MAX_WIDTH;
    		  }
    		}
        else {
    			if (height > MAX_HEIGHT) {
	    		    width *= MAX_HEIGHT / height;
	    		    height = MAX_HEIGHT;
    			}
    		}

    		canvas.width = width;
    		canvas.height = height;

    		ctx.drawImage(img, 0, 0, width, height);
        data = canvas.toDataURL('image/jpeg');

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
  }
*/

 newPictureSelected(image) {
   console.log('newPictureSelected', image.length)
   this.pictures.push(image);
   this.slides.update();
   setTimeout(_ => {
     this.slides.update();
     if (this.pictures.length > 1) {
       this.slides.slideTo(this.pictures.length, 300, true);
       this.slides.update();
     }
   }, 100);

 }
  cancel() {
    this.viewCtrl.dismiss();
  }

  createReport() {
    if (!this.form.valid)
      return;
    let report:IReport = {
      _id: null,
      created: null,
      approved: [],
      disapproved: [],
      description: this.form.value.description,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      pictures: this.pictures,
      title: this.form.value.title,
      _creator: null,
      place: this.form.value.place,
      category: <ReportCategory>this.form.value.category
    }

    this.reportProvider.insert(report)
        .subscribe(
          (result) => {
            if (!result.success) {
              this.showToast('Une erreur est survenue lors du traitement de votre requête. Veuillez rééessayer.');
            }
            else {
              this.viewCtrl.dismiss(result.report);
            }
          },
          (err) => {
            this.showToast('Une erreur est survenue lors du traitement de votre requête. Veuillez rééessayer.');
          }
        )
  }
}
