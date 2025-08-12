import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectLoggedInProfile } from 'src/app/store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input('messages') messages: any[] = [];
  public userInfo: any;
  public destroy$ = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.store.select(selectLoggedInProfile)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          if (res) {
            console.log('user', res)
            this.userInfo = res.data;
          }
        }
      )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
