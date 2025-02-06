import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { login, selectLogInResponse, selectSignUpResponse, signup } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public firstName: any;
  public lastName: any;
  public email: any = 'basavaraj.hirur746@gmail.com';
  public password: any = "Basav@123";
  public error: any;
  public isLogInForm = true;
  public showToster = false;
  public toastMessage = '';
  private $destroy = new Subject<void>();
  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.logInResponse();
  }

  login() {
    if (this.isLogInForm) {
      const loginDetails = {
        email: this.email,
        password: this.password
      };
      this.store.dispatch(login({ loginDetails }));
    } else {
      const signupDetails = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      this.store.dispatch(signup({ signupDetails }));
      this.signUpResponse();
    }
  }

  logInResponse() {
    this.store.select(selectLogInResponse)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        {
          next: res => {
            if (res) {
              console.log(res);
              if (res.error) {
                this.error = res.error.error.message;
                if (res.error.status === 401) {
                  this.router.navigate(['/landing']);
                }
              } else {
                this.router.navigate(['']);
              }
            }
          }
        }
      )
  }

  signUpResponse() {
    this.store.select(selectSignUpResponse)
      .pipe(takeUntil(this.$destroy))
      .subscribe(res => {
        if (res) {
          console.log(res);
          if (res.error) {
            this.error = res.error.message;
          } else {
            this.toastMessage = res.message;
            this.showToster = true;
            setTimeout(() => {
              this.showToster = false;
            }, 2000);
            this.router.navigate(['/profile']);
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
