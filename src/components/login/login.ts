import { Component, ViewChild } from '@angular/core';
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

  @ViewChild('inputPasswordLogin')
  private inputPassword;

  private credentials: FormGroup;
  private showPassword: boolean = false;

  constructor(private authentication: AuthenticationProvider,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {
    this.credentials = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.inputPassword._elementRef.nativeElement.firstElementChild.type = this.showPassword ? 'text' : 'password';
  }

  doLogin() {
    this.authentication.login(this.credentials.value)
                       .subscribe(
                         jwt => {},
                         err => this.showToast(err.error));
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
