import { CookieOptions } from './../../../../../node_modules/ngx-cookie-service/lib/cookie.service.d';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { UserAccountData } from '../../create-account/user-account-data';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions;

  private userSubject = new BehaviorSubject<any>(null);
  user = this.userSubject.asObservable(); // Observable for components to subscribe
  register(newUser: UserAccountData): Observable<any> {
    return this.httpClient.post<UserAccountData>(
      `${environment.APIURL}/users/`,
      JSON.stringify(newUser),
      this.httpOptions
    );
  }
  login(email: string, password: string) {
    return this.httpClient
      .post<any>(`${environment.APIURL}/auth/login?`, { email, password })
      .pipe(
        tap((response) => {
          if (response.access_token) {

            //store token in httpOnly cookies
            this.cookieService.set('token', response.access_token, {
              path: '/',
              secure: true,
              sameSite: 'Strict',
            });
              // ✅ Store user data in a cookie
          this.cookieService.set('user', JSON.stringify(response.user), { path: '/', secure: true, sameSite: 'Strict' });

              // Update the user state

//               Why use this.userSubject.next(response.user);?
// 1️⃣ userSubject is a BehaviorSubject
// A BehaviorSubject in RxJS holds the latest value and emits it to all subscribers whenever it changes.
// It acts as a state management tool, allowing components and services to reactively subscribe to changes in the user data.
// 2️⃣ Updating the user state
// this.userSubject.next(response.user); updates the user state with the newly logged-in user's details (response.user).
// This ensures that all components that are subscribed to user$ (Observable) get the updated user information in real time.
// 3️⃣ Why is this useful?
// Keeps user data in sync across different parts of the application.
// Allows the UI (e.g., navbar, profile section) to update automatically when the user logs in or logs out.
// Reduces the need for manually fetching user data every time.
          this.userSubject.next(response.user);
          }
        })
      );
  }

  isAuthenticated():boolean {
    return !! this.cookieService.get('token')

  }
  logout() {
//     'token' → Name of the cookie to delete.
// '/' → Path of the cookie. Ensures that all paths in the application can no longer access this cookie.
    this.cookieService.delete('token','/');
//delet user data
this.cookieService.delete('user','/');

    // Clears the current user data by setting it to null.
    // Ensures that all components subscribing to user$ (Observable) immediately reflect that the user is logged out.
    // UI updates automatically (e.g., Navbar removes user profile, login button appears).
    this.userSubject.next(null);
  }
  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }
}
