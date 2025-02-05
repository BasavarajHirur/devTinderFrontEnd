import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { logout, selectLoggedInProfile } from 'src/app/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public loggedInUser: any;
  private $destroy = new Subject<void>();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getLoggedInProfile();
  }

  getLoggedInProfile() {
    this.store.select(selectLoggedInProfile)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        res => {
          console.log('nav-bar', res)
          if (res) {
            this.loggedInUser = res.data;
          }
        }
      )
  }

  logout() {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
