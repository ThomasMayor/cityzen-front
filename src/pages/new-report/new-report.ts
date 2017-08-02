import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, Platform, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {} from '@types/googlemaps';
import { Geoposition } from '@ionic-native/geolocation';
import { Observable, Subscription } from 'rxjs';
import { GeoLocationProvider } from '../../providers/geo-location/geo-location';
import { ReportProvider } from '../../providers/report/report';
import { reportCategoryHelper, ReportCategory, IReport } from '../../models/report';

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

  private readonly MAX_PICTURES: number = 5;

  private form: FormGroup;
  private pictures: string[] = [];

  @ViewChild('slides')
  private slides;

  private reportCategoryHelper = reportCategoryHelper;
  private geocoder = new google.maps.Geocoder;
  private ReportCategory = ReportCategory;
  private geoLocationSub: Subscription;
  private location: {latitude:number, longitude: number};
  private test:any;

  get showSlide(): boolean {
    return this.pictures.length == 0;
  }

  get disabledPicker() :boolean {
    return this.pictures.length >= this.MAX_PICTURES;
  }

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private platform: Platform,
              private formBuilder: FormBuilder,
              private geoLocationProvider: GeoLocationProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private reportProvider: ReportProvider) {
      let test = this.navParams.get('test');
      this.test = test;
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
          if (!test)
            this.location = { latitude: location.coords.latitude, longitude: location.coords.longitude };
          else
            this.location = { latitude: test.lat, longitude: test.lng };
          if (this.geoLocationSub)
            this.geoLocationSub.unsubscribe();
          this.geocoder = new google.maps.Geocoder();
          let geoCoderOption = {location: {lat: location.coords.latitude, lng: location.coords.longitude}};
          if (test)
            geoCoderOption.location = { lat: test.lat, lng: test.lng };
          this.geocoder.geocode(geoCoderOption,
            (result, status) => {
              console.log('Geocoder result', result, status);
              console.log(result.find((item) => item.address_components.find((adr) => adr.short_name === "GE") !== undefined))
              if (status == google.maps.GeocoderStatus.OK) {
                if (-1 == result.findIndex((item) => item.address_components.find((adr) => adr.short_name === "GE") !== undefined)) {
                  const alert = this.alertCtrl.create({ enableBackdropDismiss: false,
                                                        title: 'Erreur',
                                                        message: 'Impossible de créer un constat, vous devez obligatoirement vous trouver dans le canton de Genève.',
                                                        buttons: [{
                                                          text: 'Fermer',
                                                          handler: () => {
                                                            this.viewCtrl.dismiss();
                                                          }
                                                        }]
                                                      });
                  alert.present();
                }
                else {
                  this.form.controls['place'].setValue(result[0].formatted_address);
                }
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

 pictureSelected(image) {
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
      created: this.test ? this.test.created : null,
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
              if (result.needwait) {
                const alert = this.alertCtrl.create({ enableBackdropDismiss: false,
                                                      subTitle: 'Merci de votre participation !',
                                                      title: 'Merci !',
                                                      message: result.message,
                                                      buttons: [{
                                                        text: 'Fermer',
                                                        handler: () => {
                                                          this.viewCtrl.dismiss();
                                                        }
                                                      }]
                                                    });
                alert.present();
              }
              else {
                this.showToast('Une erreur est survenue lors du traitement de votre requête. Veuillez rééessayer.');
              }
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
