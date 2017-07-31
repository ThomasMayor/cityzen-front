import { Injectable } from '@angular/core';

/*
  Generated class for the FormMessageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FormMessageProvider {
    getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Requis',
            'email': 'Adresse email invalide',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Longueur minimum: ${validatorValue.requiredLength} caractères`
        };
        return config[validatorName];
    }

}
