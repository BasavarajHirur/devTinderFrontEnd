import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ConnectionRequestService {

  constructor(private http: HttpClient) { }

  sendRequest(status: string, userId: any): Observable<any> {
    return this.http.post(BASE_URL + `/request/send/${status}/${userId}`, {}, { withCredentials: true });
  }

  reviewRequest(status: string, requestId: any): Observable<any> {
    return this.http.post(BASE_URL + `/request/review/${status}/${requestId}`, {}, { withCredentials: true });
  }
}
