import { ToastController } from 'ionic-angular';

export class CoreController {
  constructor(public toastCtrl: ToastController) {
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
