import { environment } from './../environments/environment';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular//common/http'
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserAccountData } from 'src/app/users/create-account/user-account-data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions;
  constructor(private httpClient:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: 'my-auth-token'
      })
    };
   }
// user!:string;
//********************* */ moved to auth service  ********************************
//   register(newuser:UserAccountData):Observable<UserAccountData>{
// console.log('api service ::: ',newuser)
// return this.httpClient.post<UserAccountData>(`${environment.APIURL}/users`,JSON.stringify(newuser),this.httpOptions)

  // }
  checkUserData(sginInEmail:string) : Observable<UserAccountData>{

  //  this.httpClient.get<UserAccountData>(`${environment.APIURL}/users?email=${sginInEmail}`).subscribe(checkedUser=>{ this.user = checkedUser.password;   console.log('subscribe ',this.user,sginInPassword)
  //  })
    return this.httpClient.get<UserAccountData>(`${environment.APIURL}/users?email=${sginInEmail}`)
  }

  //get prouduct by limits
getUserByToken(): Observable<UserAccountData>{
  return this.httpClient.get<UserAccountData>('https://api.escuelajs.co/api/v1/auth/profile')
  // return {name:'ali', email :'ali@mail.com'}
}
updateUservalue(id:number,updatedUserData:UserAccountData): Observable<UserAccountData>{
  console.log('updatedUserData)',updatedUserData)
  console.log('id)',id)

return this.httpClient.put<UserAccountData>(`${environment.APIURL}/users/${id}`,JSON.stringify(updatedUserData),this.httpOptions)
}
deleteUserById(id:number){
return this.httpClient.delete((`${environment.APIURL}/users/${id}`))
}

}
