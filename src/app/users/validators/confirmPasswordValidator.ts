import {FormGroup } from '@angular/forms';

export function confirmPassword (FormGroup:FormGroup): null{
const pass = FormGroup.controls['password'];
const conPass = FormGroup.controls['confirmPassword'];
if (conPass.dirty && pass.touched && pass.dirty && pass!=conPass) {
conPass.setErrors({matchPassword:true})

}
return null
}

