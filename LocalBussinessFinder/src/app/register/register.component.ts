import { Component } from '@angular/core';
import { RegisterList } from '../lfile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new RegisterList('Enter Email', 'Enter Username', 'Enter Password', 'Confirm Password');
  submitted = false;
  onSubmit() {
    this.submitted = true;
    console.log("submitted ran");
  }
  setUsername(val: string){
    this.user.username = val;
  }
  setEmail(val1: string){
    this.user.email = val1;
  }
  setPassword(val2: string){
    this.user.password = val2
  }
  setConfirmPassword(val3: string){
    this.user.confirmPass = val3;
  }
}
