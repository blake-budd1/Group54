import { Component } from '@angular/core';
import { LoginList, userSignedIn } from '../lfile';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private http: HttpClient, private router: Router){}
  user = new LoginList('Enter Username', 'Enter Password');
  onSubmit() {
    return this.http.post('api/login', this.user).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      //Stringify generic object and parse into obj with JSON.parse

      console.log(response)
      const obj = Object.assign(response)
      

      //MAKE SURE THE NAMES OF YOUR ATTRIBUTE (after obj.) MATCHES THE RESPONSE NAME (IN BACKEND DOCS)
      if(obj.loginStatus == "Username_Not_Found"){
        console.warn("Username not found -> implement warning)")
      }
      else if(obj.loginStatus == "Success"){
        //CODE FOR IF CORRECT PASSWORD/USER COMBO
        this.router.navigate(['Setup'])
      }
      else if(obj.loginStatus == "Incorrect_Password"){
        //CODE FOR INCORRECT PASSWORD 
        console.warn("Incorrect Password -> implement warning)")
      }
    })
    ;}

  setUsername(val: string){
    this.user.username = val;
    console.warn(this.user.username);
  }
  setPassword(val1: string){
    this.user.password = val1; 
    console.warn(this.user.password);
  }
}
