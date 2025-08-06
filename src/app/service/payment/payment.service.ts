import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePayment(type: string) {
    return this.http.post(BASE_URL + '/payment/order', { membershipType: type }, { withCredentials: true });
  }
}
