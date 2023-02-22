import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
 Wavid
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileSetupComponent,
    ImageUploadComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
