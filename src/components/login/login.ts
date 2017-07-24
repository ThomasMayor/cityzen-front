import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationProvider } from '../../providers/authentication/authentication'
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  private credentials: FormGroup;

  constructor(private authentication: AuthenticationProvider,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {
    console.log('Hello LoginComponent Component');
    this.credentials = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  doLogin() {
    console.log(this.credentials.value);
    this.authentication.login(this.credentials.value)
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
