import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateFullName } from './validators';

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
    exclusiveDeals : new FormControl('',[Validators.required]),
    termsAndConditions : new FormControl('',[Validators.required])

  })
  constructor() { }

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
get termsAndConditions (){
  return this.createAccount.get('termsAndConditions');
}
}
