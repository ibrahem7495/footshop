import { Router, Routes } from '@angular/router';
import { AuthService } from './../auth/authService/auth.service';
import { ApiService } from '../../../services/api.service';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateFullName } from '../validators/fullNameValidator';
import { confirmPassword } from '../validators/confirmPasswordValidator';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editAccount = new FormGroup({
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
  });
  editSuccessAlert: boolean;
  deletedSuccessAlert: boolean;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.editSuccessAlert = false;
    this.deletedSuccessAlert = false;
  }

  ngOnInit(): void {
    this.apiService.getUserByToken().subscribe((user) => {
      this.editAccount.patchValue(user);
    });
  }

  get fullName() {
    return this.editAccount.get('name');
  }

  get email() {
    return this.editAccount.get('email');
  }
  get password() {
    return this.editAccount.get('password');
  }
  get exclusiveDeals() {
    return this.editAccount.get('exclusiveDeals');
  }
  get confirmPassword() {
    return this.editAccount.get('confirmPassword');
  }

  editProfile() {
    //  ******** first method  ***** */
    // this.apiService.getUserByToken().subscribe(user=>{this.apiService.updateUservalue(user.id,this.editAccount.value).subscribe(

    // )
    // You're using .subscribe() twice because you need to perform two sequential API calls:

    // First subscribe() → Fetch user data (getUserByToken())
    // Second subscribe() → Update user data (updateUser(user.id, this.editAccount.value))
    // 🔹 Why is this necessary?
    // You first need the user's ID to update their account.
    // Since getUserByToken() is an asynchronous API call, you can’t just assume the user ID is available immediately.
    // Once the user ID is retrieved, you can pass it into updateUser().
    // Each .subscribe() ensures the response is received before proceeding to the next step.

    //               **********    best practice  ************** */
    // using switchMap
    //     When Should You Use switchMap?

    // Use switchMap when...	Use .subscribe() separately when...
    // You need one request to depend on another (like fetching a user before updating them).	You don’t need to chain API calls, just process a single observable.
    // You want to avoid nested subscriptions and keep the code clean.	Each API call is independent and doesn’t need another request’s data.
    // The latest request should cancel any previous ongoing request.	You need multiple simultaneous requests (like fetching user data and products at the same time).
    // 💡 Final Takeaway
    // switchMap is ideal when you need to chain multiple API calls while ensuring only the latest request is processed.
    // It prevents memory leaks, optimizes performance, and makes the code more readable.
    // If you don't need automatic cancelation and want all requests to go through, consider using mergeMap instead.
    //*************** */

    this.apiService
      .getUserByToken()
      .pipe(
        switchMap((user) => {
          console.log('User ID:', user.id);
          return this.apiService.updateUservalue(
            user.id,
            this.editAccount.value
          );
        })
      )
      .subscribe({
        next: () => {
          this.editSuccessAlert = true;
          setTimeout(() => (this.editSuccessAlert = false), 3000); // إغلاق تلقائي بعد 3 ثواني
          console.log('User updated successfully!');
        },
        error: (err) => {
          console.error('Error:', err);
          // alert('Error updating account.');
        },
      });
    // Why is this better?
    // Problem in original code	Fix using switchMap
    // Nested .subscribe() makes it harder to read	Flat structure, more readable
    // Possible memory leaks from multiple subscriptions	Single subscription avoids leaks
    // Harder to handle errors globally	RxJS operators provide better error handling
    // 💡 Key Takeaway
    // Using RxJS (switchMap) helps avoid unnecessary nesting.
    // It makes the code more readable & efficient while still executing sequential API calls.
    // The second API call (updateUser()) only runs after the first one (getUserByToken()) completes.
    // Would you like to integrate global error handling for API calls as well? 🚀

    // ** switchMap ***

    // explain why using   switchMap

    // ********** ChatGPT **************:

    // Why Use switchMap in RxJS?
    // switchMap is an RxJS operator that is used when you need to execute one observable based on the result of another while ensuring that only the latest request is processed.

    // 🔹 What Problem Does switchMap Solve?
    // In your original code, you had two separate .subscribe() calls, which resulted in nested subscriptions. This approach has a few issues:

    // Callback Hell (Nested Subscriptions)

    // The more API calls you need to chain, the more deeply nested your code becomes.
    // This makes it harder to read, maintain, and debug.
    // Memory Leaks (Multiple Subscriptions)

    // If the first subscription is still active and another request starts, you could have multiple active subscriptions at the same time, leading to potential memory leaks.
    // Unnecessary API Calls

    // If the user triggers updateUser() multiple times in quick succession, multiple API calls to getUserByToken() may be made.
    // The previous calls don't get canceled, leading to wasted API resources.
    // 🔹 How switchMap Fixes This
    // ✅ Automatically Cancels Previous Requests

    // If a new request comes in before the previous one finishes, switchMap cancels the previous request and only processes the latest one.
    // ✅ Flattens Observables (Avoids Nesting)

    // Instead of nesting .subscribe() calls, switchMap merges them into a single observable, making the code cleaner.
    // ✅ Optimized Performance & Readability

    // Since switchMap handles cancelation automatically, it prevents memory leaks and keeps your code structured & readable.
  }
  deleteUser() {
    this.apiService.getUserByToken().subscribe({
      next: (user) => {
        this.apiService.deleteUserById(user.id).subscribe({
          next: () => {
            console.log('User deleted successfully!'),
              (this.deletedSuccessAlert = true);

            setTimeout(() => (this.deletedSuccessAlert = false), 3000); // إغلاق تلقائي بعد 3 ثواني
            setTimeout(() => this.router.navigate(['/login']), 3000); // انتقال تلقائي بعد 3 ثواني الى صفحة تسجيل الدخول
          },
          error: (err1) => {
            console.error('Error:', err1);
          },
        });
      },
      error: (err2) => {
        console.error('Error:', err2);
      },
    });
  }
  /***** ng alerts */
  //  alertVisible = false;

  //  showAlert() {
  //    this.alertVisible = true;
  //    setTimeout(() => this.alertVisible = false, 3000); // إغلاق تلقائي بعد 3 ثواني
  //  }

  //  closeAlert() {
  //    this.alertVisible = false;
  //  }

  ngOnDestroy(): void {
    //reset addedSuccessAlert value
    this.editSuccessAlert = false;
    this.deletedSuccessAlert = false;
  }
}
