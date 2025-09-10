import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    commonEfects,
    commonReducer,
    ProfileEfects,
    profileReducer
} from './store';
import {
    FooterComponent,
    LoginComponent,
    NavBarComponent,
    ProfileComponent
} from './components';
import {
    BodyComponent,
    ChatComponent,
    ChatPageComponent,
    ConnectionsComponent,
    FeedComponent,
    HomePageComponent,
    RequestsComponent
} from './page';
import {
    AuthService,
    ChatService,
    ConnectionRequestService,
    PaymentService,
    ProfileService,
    UserService
} from './service';
import { userReducer } from './store/user/user.reducer';
import { UserEfects } from './store/user/user.effects';
import { UserCardComponent } from './components/user-card/user-card.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { requestsReducer } from './store/connectionRequests/requests.reducer';
import { RequestEfects } from './store/connectionRequests/requests.effects';
import { UserCardShimmerComponent } from './components/shimmers/user-card-shimmer/user-card-shimmer.component';
import { RegisterFormShimmerComponent } from './components/shimmers/register-form-shimmer/register-form-shimmer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FeaturesComponent } from './components/features/features.component';
import { PremiumComponent } from './components/premium/premium.component';
import { paymentReducer } from './store/payment/payment.reducer';
import { PaymentEffects } from './store/payment/payment.effects';
import { ChatEffects, chatReducer } from './store/chat';

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
        FeaturesComponent,
        PremiumComponent,
        ChatComponent,
        HomePageComponent,
        ChatPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        HammerModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('commonData', commonReducer),
        StoreModule.forFeature('profilesData', profileReducer),
        StoreModule.forFeature('userData', userReducer),
        StoreModule.forFeature('requestsData', requestsReducer),
        StoreModule.forFeature('paymentData', paymentReducer),
        StoreModule.forFeature('chat', chatReducer),
        EffectsModule.forFeature([commonEfects, ProfileEfects, UserEfects, RequestEfects, PaymentEffects, ChatEffects])
    ],
    providers: [AuthService, ProfileService, UserService, ConnectionRequestService, PaymentService, ChatService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
