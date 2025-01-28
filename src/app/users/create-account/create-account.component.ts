import { ApiService } from './../../../server/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateFullName } from '../validators/fullNameValidator';
import { confirmPassword } from '../validators/confirmPasswordValidator';
import { UserAccountData } from './user-account-data';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccount = new FormGroup({
    fullName : new FormControl('',[Validators.required,Validators.minLength(5),validateFullName]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(7)]),
    confirmPassword : new FormControl('',[Validators.required]),

     exclusiveDeals : new FormControl('',[Validators.required]),
     termsAndConditions : new FormControl('',[Validators.required])

  },
  { validators : confirmPassword

  })
  constructor(private apiService: ApiService) {

   }

  ngOnInit(): void {
  }
get fullName (){
  return this.createAccount.get('fullName');
}

get email (){
  return this.createAccount.get('email');
}
get password (){
  return this.createAccount.get('password');
}
get exclusiveDeals (){
  return this.createAccount.get('exclusiveDeals');
}
get confirmPassword(){
  return this.createAccount.get('confirmPassword');
}
addUser(){
this.apiService.register(this.createAccount.value).subscribe(user=>{alert('added'); })
}
}
