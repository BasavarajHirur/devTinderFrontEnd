import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(signUpDetails: any): Observable<any> {
    return this.http.post(BASE_URL + '/signup', signUpDetails);
  }

  login(loginDetails: any): Observable<any> {
    return this.http.post(BASE_URL + '/login', loginDetails, { withCredentials: true });
  }
}
