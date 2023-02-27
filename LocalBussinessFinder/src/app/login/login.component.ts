import { Component } from '@angular/core';
import { LoginList } from '../lfile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new LoginList('Enter Username', 'Enter Password');
  submitted = false;
  onSubmit() {
    this.submitted = true;
    JSON.stringify(this.user);
    console.log("submitted ran");
  }
  setUsername(val: string){
    this.user.username = val;
    console.warn(val);
  }
  setPassword(val1: string){
    this.user.password = val1; 
    console.warn(val1);
  }
}
