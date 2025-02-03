import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: any = 'basavaraj.hirur746@gmail.com';
  public password: any = "Basav@123";

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {

  }

  login() {
    const loginDetails = { email: this.email, password: this.password };
    this.store.dispatch(login({ loginDetails }));
    this.router.navigate(['']);
  }
}
