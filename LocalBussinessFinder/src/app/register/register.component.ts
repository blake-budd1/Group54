import { Component } from '@angular/core';
import { RegisterList } from '../lfile';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, ignoreElements } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { error_popup } from '../Error_Popup/error_popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router){}
  user = new RegisterList('Enter Email', 'Enter Username', 'Enter Password', 'Confirm Password');
  submitted = false;
  errorType = "";
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
        this.router.navigate(['Setup'])
      }
      else if(regObj.Reg_State == "Email_Registered"){
        //CODE FOR EMAIL ALREADY REGSITERED
        console.log("Email Already Registered")
          //CODE FOR INCORRECT PASSWORD 
          console.warn("Email In use -> implement warning)")
          this.errorType = "Email"
          this.displayError();
        
      }
      else if(regObj.Reg_State == "Unmatched Password"){
        //NOTIFY USER PASSWORDS DON'T MATCH
        console.log("Passwords don't match")
        console.warn("Password Mismatch -> implement warning)")
        this.errorType = "NotMatch"
        this.displayError();
      }
      else if(regObj.Reg_State == "Username_Taken"){
        //NOTIFY USER THE USERNAME IS TAKEN
        console.log("Username Taken")
        console.warn("User in use-> implement warning)")
        this.errorType = "UserUsed"
        this.displayError(); 
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
  displayError(){
    const dialogRef = this.dialog.open(error_popup, {
      width: "600px",
      height: "180px",
      data: {useCase: this.errorType}
    });
  }
}