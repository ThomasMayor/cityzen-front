import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormMessageProvider } from '../../providers/form-message/form-message';

/**
 * Generated class for the FormMessageComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'form-message',
  templateUrl: 'form-message.html'
})
export class FormMessageComponent {

  //error: string = '';
  @Input() control: FormControl;

  constructor(private formMessage: FormMessageProvider) {
  }

  public get error(): string {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        let msg = this.formMessage.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        return msg;
      }
    }
    return '';
  }

}
