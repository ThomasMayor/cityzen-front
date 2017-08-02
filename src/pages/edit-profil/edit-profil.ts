import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {} from '@types/googlemaps';
import { Observable, Subscription } from 'rxjs';
import { UserProvider } from '../../providers/user/user';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ToastController } from 'ionic-angular';
import { IUser, userScore } from '../../models/user';
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
  private showPassword: boolean = false;
  private user:IUser;
  private profilePicture: string = '';

  @ViewChild('inputPasswordSignup')
  private inputPassword;


  constructor(private navCtrl: NavController,
              private navParams :NavParams ,
              private viewCtrl: ViewController,
              private platform: Platform,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private userProvider: UserProvider,
              private authProvider: AuthenticationProvider) {



      this.authProvider.authUser$.subscribe(
        (user) => {
          console.log('edit profil use subs', user);
          this.user = user;
          if (user == null)
            return;
          this.profilePicture = this.user.profilePicture;
          this.form = this.formBuilder.group({
            name: [this.user.name, Validators.compose([Validators.minLength(3), Validators.maxLength(30)])],
            email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
            password: ['']
          });
        }
      );
  }


  get score(): number {
    return userScore.compute(this.user); 
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.inputPassword._elementRef.nativeElement.firstElementChild.type = this.showPassword ? 'text' : 'password';
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      closeButtonText: 'Fermer',
      showCloseButton: true
    });
    toast.present();
  }

 pictureSelected(image) {
   console.log('newPictureSelected', image.length)
   this.user.profilePicture = image;
   this.profilePicture = image;
 }

  cancel() {
    this.viewCtrl.dismiss();
  }

  saveUser() {
    if (!this.form.valid)
      return;
    let user:any = {
      email: this.form.value.email,
      name: this.form.value.name,
      profilePicture: this.user.profilePicture,
    }
    if (this.form.value.password)
      user.password = this.form.value.password;

    this.userProvider.update(user, this.user._id)
        .subscribe(
          (result) => {
            if (result.success) {
              this.authProvider.handleJwtResponse(result);
              this.showToast('Le profil à bien été sauvé.')
            }
            else {
              console.log("User save error", result.message);
              this.showToast('Une erreur est survenue lors du traitement de votre requête. Veuillez rééessayer.')
            }
          },
          (err) => {
            console.log("User save error", err);
            this.showToast('Une erreur est survenue lors du traitement de votre requête. Veuillez rééessayer.')
          }
        );
  }
}
