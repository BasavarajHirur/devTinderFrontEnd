import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './page/body/body.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './page/feed/feed.component';
import { ConnectionsComponent } from './page/connections/connections.component';
import { RequestsComponent } from './page/requests/requests.component';
import { authGuardGuard } from './service/auth-guard.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  {
    path: '', component: BodyComponent, canActivate: [authGuardGuard], children: [
      { path: '', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'connections', component: ConnectionsComponent },
      { path: 'requests', component: RequestsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
