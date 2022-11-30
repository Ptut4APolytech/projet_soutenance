import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomFormValidators {
  static matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const baseControl = control.get(controlName);
      const controlToCompare = control.get(matchingControlName);
      if (
        baseControl &&
        controlToCompare &&
        controlToCompare.value !== baseControl.value
      ) {
        return { notEquivalent: true };
      }
      return null;
    };
  }
}
