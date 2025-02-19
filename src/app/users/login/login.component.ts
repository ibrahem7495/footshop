import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../auth/authService/auth.service';
import { UserAccountData } from '../create-account/user-account-data';
import { ApiService } from '../../../server/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  inputUserData?: UserAccountData;
  sginIn = new FormGroup({
    inputEmail: new FormControl(''),
    inputPassword: new FormControl(''),
  });
  loginFlag : boolean;
  userData:any;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cookieService:CookieService,
  ) {
    this.loginFlag = this.authService.isAuthenticated();

  }

  ngOnInit(): void {}
  get inputEmail() {
    return this.sginIn.get('inputEmail');
  }
  get inputPassword() {
    return this.sginIn.get('inputPassword');
  }

  //   getAcoount(){
  //    const observer ={
  // next : (sgin :any)=>{
  //   console.log('sgin ',sgin )
  //   console.log('sign password ',sgin[0].password )

  //   if (sgin[0].password == this.inputPassword?.value) {
  //     this.loginFlag = true;
  //      this.userName = sgin[0].fullName
  //     console.log('if ',this.loginFlag )
  //     }
  //     else{
  //       this.loginFlag = false;

  //     }
  // }
  //      ,error:(err: Error )=>{console.error("cant fiind acoount")}
  //     }

  // this.apiService.checkUserData(this.inputEmail?.value).subscribe(observer)

  // }
  //************************************************************************************************* */
  userLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: () =>{

        // update  loginFlag  value
        this.loginFlag=this.authService.isAuthenticated();
      console.log('login successful')},
      error: (err) => {console.log('Login failed:', err)}
    });
  }

  userLogout(){
    this.authService.logout();
    // update  loginFlag  value
    this.loginFlag=this.authService.isAuthenticated();

  }


}

