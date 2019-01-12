import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkFormComponent } from './components/drink-form/drink-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { LocationsComponent } from './components/locations/locations.component';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxSelectModule } from 'ngx-select-ex';
import { ReactiveFormsModule  } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';
import { UserListComponent } from './components/user-list/user-list.component';
import {MediainputComponent} from './components/mediainput/mediainput.component';
import {SafeUrlPipe} from './components/safe-pipe/safe-pipe.component';
import { SafePipeModule } from 'safe-pipe';
import { FileUploadModule } from 'ng2-file-upload';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MediainputComponent,
    DrinkListComponent,
    SafeUrlPipe,
    DrinkFormComponent,
    UserProfileComponent,
    LoginComponent,
    LocationFormComponent,
    LocationsComponent,
    NavigationComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    SafePipeModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSelectModule,
    FormsModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:4200']
        }
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
