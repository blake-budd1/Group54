import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
<<<<<<< Updated upstream

=======
import { MatDialogModule } from '@angular/material/dialog';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileSetupComponent,
    NavbarComponent,
    SearchComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
<<<<<<< Updated upstream
    MatIconModule
=======
    MatIconModule,
    MatDialogModule
>>>>>>> Stashed changes

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// ng add @cypress/schematic
// ng test (karma/ jasmine tests)
// npx cypress open
// npx cypress run to save the videos in the video folder!
// npm start