import { Component } from '@angular/core';
import { RegisterList } from '../lfile';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient){}
  user = new RegisterList('Enter Email', 'Enter Username', 'Enter Password', 'Confirm Password');
  submitted:boolean = false;
  onSubmit(httpSend:boolean = true) {
    this.submitted = true;
    if(httpSend){
      return this.http.post('api/register', this.user).pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      ).subscribe(response => {
        console.log(response);
      });
    }else{
      return true;
    }
  }
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
