import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { error_popup } from './Error_Popup/error_popup.component';
const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Setup',component:ProfileSetupComponent},
  {path:'Search', component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
