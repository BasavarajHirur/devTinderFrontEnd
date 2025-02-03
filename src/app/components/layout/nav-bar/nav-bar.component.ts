import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public loggedInUser: any;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectLoggedInUser).subscribe(
      res => {
        if (res) {
          this.loggedInUser = res
        }
      }
    )
  }
}
