import { UserAccountData } from '../create-account/user-account-data';
import { ApiService } from './../../../server/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputUserData?:UserAccountData;
sginIn = new FormGroup({
inputEmail:new FormControl(''),
inputPassword : new FormControl('')
})
loginFlag : boolean;
userName:string;
  constructor(private apiService:ApiService) {
    this.loginFlag = false;
    this.userName='';
  }

  ngOnInit(): void {
  }
  get inputEmail(){
    return this.sginIn.get('inputEmail');
  }
  get inputPassword(){
    return this.sginIn.get('inputPassword');
  }
  getAcoount(){
   const observer ={
next : (sgin :any)=>{
  console.log('sgin ',sgin )
  console.log('sign password ',sgin[0].password )

  if (sgin[0].password == this.inputPassword?.value) {
    this.loginFlag = true;
     this.userName = sgin[0].fullName
    console.log('if ',this.loginFlag )
    }
    else{
      this.loginFlag = false;

    }
}
     ,error:(err: Error )=>{console.error("cant fiind acoount")}
    }

this.apiService.checkUserData(this.inputEmail?.value).subscribe(observer)

}
}
