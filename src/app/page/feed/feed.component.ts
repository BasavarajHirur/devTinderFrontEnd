import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { loadUserFeed } from 'src/app/store/user/user.actions';
import { selectUserFeeds } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {

  public users: any[] = [];
  private $destroy = new Subject<void>();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadUserFeed());
    this.getUserFeed();
  }

  getUserFeed() {
    this.store.select(selectUserFeeds)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        res => {
          if (res) {
            console.log('res feed', res)
            this.users = res.data;
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
