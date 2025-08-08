import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoggedInProfile } from 'src/app/store';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.select(selectLoggedInProfile).subscribe(
      res => {
        if (res) {
          this.isLoggedIn = true;
        }
      }
    )
  }

  goToFeed() {
    this.router.navigate(['/feed']);
  }
}
