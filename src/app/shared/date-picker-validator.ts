import { AbstractControl } from '@angular/forms';

export function DatepickerValidator(control: AbstractControl) {
  if (!control.value) {
    return { dateValid: true };
  }
  return null;
}