import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(BASE_URL + '/profile/view', { withCredentials: true });
  }

  editProfile(profileDetails: any): Observable<any> {
    return this.http.patch(BASE_URL + '/profile/edit', profileDetails, { withCredentials: true });
  }

  sendRequest(): Observable<any> {
    return this.http.post(BASE_URL + '/profile/sendrequest', null, { withCredentials: true });
  }
}
