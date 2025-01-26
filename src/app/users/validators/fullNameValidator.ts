import { AbstractControl } from "@angular/forms";

export function validateFullName (control :AbstractControl ){
  if (control.value.match(/[0-9]/g)) {
  return {invalidName:true};
  }
  return null;
}

