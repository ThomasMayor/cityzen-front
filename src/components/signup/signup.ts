import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationProvider } from '../../providers/authentication/authentication'
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the SignupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {
  private credentials: FormGroup;

  constructor(private authentication: AuthenticationProvider,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {
    console.log('Hello SignupComponent Component');
    this.credentials = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  doSignup() {
    console.log(this.credentials.value);

    this.authentication.signup(this.credentials.value)
                       .subscribe(
                         jwt => {},
                         err => this.showToast(err.statusText));
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      closeButtonText: 'Fermer',
      showCloseButton: true
    });
    toast.present();
  }

}
