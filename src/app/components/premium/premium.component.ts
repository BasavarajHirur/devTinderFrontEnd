import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createOrder } from 'src/app/store/payment/payment.actions';
import { selectOrderResponse } from 'src/app/store/payment/payment.selectors';

declare var Razorpay: any; // Declare Razorpay globally

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {

  }

  makePayment(type: string) {
    this.store.dispatch(createOrder({ membershipType: type }));
    this.getOrderResponse();
  }

  getOrderResponse() {
    this.store.select(selectOrderResponse)
      .subscribe((data) => {
        console.log('Order Response:', data);
        if (data && !data.error) {
          // Open Razorpay Checkout
          const options = {
            key: 'YOUR_KEY_ID', // Replace with your Razorpay key_id
            amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'Acme Corp',
            description: 'Test Transaction',
            order_id: 'order_IluGWxBm9U8zJ8', // This is the order_id created in the backend
            prefill: {
              name: 'Basavaraja',
              email: 'basava@example.com',
              contact: '9999999999'
            },
            theme: {
              color: '#F37254'
            },
          };

          const rzp = new Razorpay(options);
          rzp.open();
        }
      });
  }
}
