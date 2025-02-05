import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { sendRequest } from 'src/app/store/connectionRequests/requests.actions';
import { selectSendRequestFails } from 'src/app/store/connectionRequests/requests.selectors';
import { updateUserFeeds } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {
  @Input('user') user: any;
  public userId: any;
  private $destroy = new Subject<void>();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.sendRequestFails();
  }

  sendRequest(status: string, userId: any) {
    this.userId = userId;
    this.store.dispatch(sendRequest({ status, userId }));
  }

  sendRequestFails() {
    this.store.select(selectSendRequestFails)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        res => {
          if (res) {

          }
        }
      )
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
