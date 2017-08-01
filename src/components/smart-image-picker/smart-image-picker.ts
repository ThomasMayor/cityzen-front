import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Platform, ToastController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CoreController } from '../../core/core-controller';
/**
 * Generated class for the SmartImagePickerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'smart-image-picker',
  templateUrl: 'smart-image-picker.html'
})
export class SmartImagePickerComponent extends CoreController {

  @ViewChild('fileInput')
  private fileInput: any;

  @Input()
  private profilePictureMode: boolean = false;

  @Input()
  private pictWidth: number = 800;

  @Input()
  private pictHeight: number = 600;

  @Output()
  public pictureSelected: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  private disabled:boolean = false;

  @Input()
  private imageData: string = '';

  constructor(toastCtrl: ToastController,
              private platform: Platform,
              private camera : Camera,
              private actionSheetCtrl: ActionSheetController) {
    super(toastCtrl);
  }

  private get profileImageStyle():string {
    return 'url(' + this.imageData + ')';
  }

  private getPicture() {
    if (Camera['installed']()) {
      //ask for source type
      if (this.profilePictureMode) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Photo de profil',
          enableBackdropDismiss: true,
          buttons: [
            {
              icon: 'images',
              text: 'Galerie',
              handler: () => {
                this.getPictureFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            },{
              icon: 'camera',
              text: 'Appareil photo',
              handler: () => {
                this.getPictureFromCamera();
              }
            },{
              text: 'Annuler',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }
      else {
        this.getPictureFromCamera();
      }
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  private getPictureFromCamera(source: number = this.camera.PictureSourceType.CAMERA) {
    this.camera.getPicture({
      sourceType: source,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: this.pictWidth,
      targetHeight: this.pictHeight,
      saveToPhotoAlbum: false,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((data) => {
      data = 'data:image/jpg;base64,' + data;
      this.pictureSelected.emit(data);
      if (this.profilePictureMode) {
        this.imageData = data;
      }
    }, (err) => {
      this.showToast(`Un problème est survenu lors de la récupération de l'image.`);
    })
  }

  private processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.setNewPicture(imageData);
    };
    if (event.target.files.length)
      reader.readAsDataURL(event.target.files[0]);
  }

  private setNewPicture(imageData) {
    let canvas = document.createElement('canvas');
  	let img = new Image();
		img.onload = (imageEvent) => {
			let ctx = canvas.getContext('2d');

  		const MAX_WIDTH = 800;
  		const MAX_HEIGHT = 600;

  		let width = img.width;
  		let height = img.height;

  		if (width > height) {
  		  if (width > this.pictWidth) {
  		    height *= this.pictWidth / width;
  		    width = this.pictWidth;
  		  }
  		}
      else {
  			if (height > this.pictHeight) {
    		    width *= this.pictHeight / height;
    		    height = this.pictHeight;
  			}
  		}

  		canvas.width = width;
  		canvas.height = height;

  		ctx.drawImage(img, 0, 0, width, height);
      imageData = canvas.toDataURL('image/jpeg');
      this.pictureSelected.emit(imageData);
      if (this.profilePictureMode) {
        this.imageData = imageData;
      }
		};
		img.src = imageData;

  }



}
