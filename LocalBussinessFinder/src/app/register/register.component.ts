import { Component } from '@angular/core';
import { RegisterList } from '../lfile';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, ignoreElements } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient){}
  user = new RegisterList('Enter Email', 'Enter Username', 'Enter Password', 'Confirm Password');
  submitted = false;
  onSubmit() {
    return this.http.post('api/register', this.user).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      let regObj = Object.assign(response)
      if(regObj.Reg_State == "Successful"){
        // CODE FOR SUCCESSFUL REGISTRATION
        console.log("Registration Successful")
      }
      else if(regObj.Reg_State == "Email_Registered"){
        //CODE FOR EMAIL ALREADY REGSITERED
        console.log("Email Already Registered")
      }
      else if(regObj.Reg_State == "Unmatched Password"){
        //NOTIFY USER PASSWORDS DON'T MATCH
        console.log("Passwords don't match")
      }
      else if(regObj.Reg_State == "Username_Taken"){
        //NOTIFY USER THE USERNAME IS TAKEN
        console.log("Username Taken")
      }


      console.log(response);
    });}

  setEmail(val1: string){
    this.user.email = val1;
  }
  setUsername(val2: string){
    this.user.username = val2;
  }
  setPassword(val3: string){
    this.user.password = val3;
  }
  setConfirmPassword(val4: string){
    this.user.confirmPassword = val4;
  }
}
