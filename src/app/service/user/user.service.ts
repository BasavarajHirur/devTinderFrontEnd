import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  feedUsers(): Observable<any> {
    return this.http.get(BASE_URL + '/users/feed', { withCredentials: true });
  }

  connections(): Observable<any> {
    return this.http.get(BASE_URL + '/users/connection', { withCredentials: true });
  }

  recievedRequests(): Observable<any> {
    return this.http.get(BASE_URL + '/users/request/received', { withCredentials: true });
  }
}
