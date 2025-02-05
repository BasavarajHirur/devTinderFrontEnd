import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { reviewRequest } from 'src/app/store/connectionRequests/requests.actions';
import { selectReviewRequestFails } from 'src/app/store/connectionRequests/requests.selectors';
import { loadReceivedRequests, updateReceivedRequests } from 'src/app/store/user/user.actions';
import { selectReceivedRequests } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit, OnDestroy {

  public requests: any[] = [];
  public requestId: any;
  private $destroy = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadReceivedRequests());
    this.getRequests();
    this.reviewRequestFails();
  }

  getRequests() {
    this.store.select(selectReceivedRequests)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        res => {
          if (res) {
            this.requests = res.data;
          }
        }
      )
  }

  reviewRequests(status: string, requestId: any) {
    this.requestId = requestId;
    this.store.dispatch(reviewRequest({ status, requestId }));
  }

  reviewRequestFails() {
    this.store.select(selectReviewRequestFails)
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
