import { Component } from '@angular/core';
import { LoginList } from '../lfile';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient){}
  user = new LoginList('Enter Username', 'Enter Password');
  onSubmit() {
    return this.http.post('api/login', this.user).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
    });}
  setUsername(val: string){
    this.user.username = val;
    console.warn(this.user.username);
  }
  setPassword(val1: string){
    this.user.password = val1; 
    console.warn(this.user.password);
  }
}