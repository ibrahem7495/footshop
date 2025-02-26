import { Router } from '@angular/router';
import { AuthService } from './../auth/authService/auth.service';
import { ApiService } from '../../../services/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateFullName } from '../validators/fullNameValidator';
import { confirmPassword } from '../validators/confirmPasswordValidator';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  createAccount = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        validateFullName,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      avatar: new FormControl('', [Validators.required]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),

      //  exclusiveDeals : new FormControl('',[Validators.required]),
      //  termsAndConditions : new FormControl('',[Validators.required])
    },
    { validators: confirmPassword }
  );
  addedSuccessAlert: boolean;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.addedSuccessAlert = false;
  }

  ngOnInit(): void {}
  get fullName() {
    return this.createAccount.get('name');
  }

  get email() {
    return this.createAccount.get('email');
  }
  get password() {
    return this.createAccount.get('password');
  }
  get exclusiveDeals() {
    return this.createAccount.get('exclusiveDeals');
  }
  get confirmPassword() {
    return this.createAccount.get('confirmPassword');
  }
  addUser() {
    this.authService.register(this.createAccount.value).subscribe((user) => {
      this.addedSuccessAlert = true;
      setTimeout(() => this.router.navigate(['/login']), 3000); // انتقال تلقائي بعد 3 ثواني الى صفحة تسجيل الدخول
    });
  }
  // editProfile(){

  //    this.apiService.getUserByToken().subscribe(user=>{
  //     this.createAccount.patchValue(user)
  //    })

  // }
  ngOnDestroy(): void {
    //reset addedSuccessAlert value
    this.addedSuccessAlert = false;
  }
}
