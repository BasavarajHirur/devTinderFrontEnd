import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { loadConnections } from 'src/app/store/user/user.actions';
import { selectConnections } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit, OnDestroy {
  public connections: any = [];
  private $destroy = new Subject<void>();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadConnections());
    this.getConnections();
  }

  getConnections() {
    this.store.select(selectConnections)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        res => {
          if (res) {
            console.log(res);
            this.connections = res.data;
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
