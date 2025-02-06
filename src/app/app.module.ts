import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { commonEfects, commonReducer, ProfileEfects, profileReducer } from './store';
import { FooterComponent, LoginComponent, NavBarComponent, ProfileComponent } from './components';
import { BodyComponent, FeedComponent } from './page';
import { AuthService, ProfileService } from './service';
import { userReducer } from './store/user/user.reducer';
import { UserEfects } from './store/user/user.effects';
import { UserService } from './service/user/user.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ConnectionsComponent } from './page/connections/connections.component';
import { RequestsComponent } from './page/requests/requests.component';
import { ConnectionRequestService } from './service/request-connection/connection-request.service';
import { requestsReducer } from './store/connectionRequests/requests.reducer';
import { RequestEfects } from './store/connectionRequests/requests.effects';
import { UserCardShimmerComponent } from './components/shimmers/user-card-shimmer/user-card-shimmer.component';
import { RegisterFormShimmerComponent } from './components/shimmers/register-form-shimmer/register-form-shimmer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FeaturesComponent } from './components/features/features.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        BodyComponent,
        ProfileComponent,
        LoginComponent,
        FooterComponent,
        FeedComponent,
        UserCardComponent,
        EditProfileComponent,
        ConnectionsComponent,
        RequestsComponent,
        UserCardShimmerComponent,
        RegisterFormShimmerComponent,
        LandingPageComponent,
        FeaturesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('commonData', commonReducer),
        StoreModule.forFeature('profilesData', profileReducer),
        StoreModule.forFeature('userData', userReducer),
        StoreModule.forFeature('requestsData', requestsReducer),
        EffectsModule.forFeature([commonEfects, ProfileEfects, UserEfects, RequestEfects])
    ],
    providers: [AuthService, ProfileService, UserService, ConnectionRequestService],
    bootstrap: [AppComponent]
})
export class AppModule { }
