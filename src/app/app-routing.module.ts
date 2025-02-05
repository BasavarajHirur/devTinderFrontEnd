import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './page/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './page/feed/feed.component';
import { ConnectionsComponent } from './page/connections/connections.component';
import { RequestsComponent } from './page/requests/requests.component';
import { authGuardGuard } from './service/auth-guard.guard';

const routes: Routes = [
  {
    path: '', component: BodyComponent, canActivate: [authGuardGuard], children: [
      { path: '', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'connections', component: ConnectionsComponent },
      { path: 'requests', component: RequestsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
