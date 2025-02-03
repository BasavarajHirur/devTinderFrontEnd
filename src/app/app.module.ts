import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { commonEfects, commonReducer } from './store';
import { FooterComponent, LoginComponent, NavBarComponent, ProfileComponent } from './components';
import { BodyComponent, FeedComponent } from './page';
import { AuthService } from './service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    ProfileComponent,
    LoginComponent,
    FooterComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('commonData', commonReducer),
    EffectsModule.forFeature([commonEfects])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
