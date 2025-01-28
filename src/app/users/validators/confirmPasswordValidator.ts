import { ValidationErrors } from '@angular/forms';
// import {FormGroup } from '@angular/forms';

import { AbstractControl, ValidatorFn } from "@angular/forms";

// export function confirmPassword (FormGroup:FormGroup): null{
// const pass = FormGroup.controls['password'];
// const conPass = FormGroup.controls['confirmPassword'];
// if (conPass.dirty && pass.touched && pass.dirty && pass!=conPass) {
// conPass.setErrors({matchPassword:true})
// }
// return null
// }


// iti course video 26   time 2:00
export const confirmPassword : ValidatorFn =(control :AbstractControl): ValidationErrors  |null => {
  const pass = control.get('password');
  console.log('pass = ',pass?.value)
  const conPass = control.get('confirmPassword');
  console.log('conPass = ',conPass?.value)

if (conPass?.dirty && pass?.dirty && pass.value!==conPass.value) {
  conPass?.setErrors({matchPassword:true})
  console.log('if statements ')


  }
  return null
  }

