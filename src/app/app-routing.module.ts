import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './page/body/body.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './page/feed/feed.component';
import { ConnectionsComponent } from './page/connections/connections.component';
import { RequestsComponent } from './page/requests/requests.component';
import { authGuardGuard } from './service/auth-guard.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PremiumComponent } from './components/premium/premium.component';
import { ChatComponent, HomePageComponent } from './page';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: LandingPageComponent }]
  },
  {
    path: '', component: BodyComponent, canActivateChild: [authGuardGuard], children: [
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'connections', component: ConnectionsComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'premium', component: PremiumComponent },
      { path: 'chat/:toUserId', component: ChatComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
