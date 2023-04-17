import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userSignedIn } from '../lfile';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent {
  constructor(private router : Router){}
  @Input()  loggedIn: boolean = false;
  @Output() checkLog = new EventEmitter<boolean>();
  swapLogged(){
    if(this.loggedIn) {
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }
  }
  checkIfLogged(){
    if(userSignedIn.currentUser=="NULL"){
      return false;
    }else{
      return true;
    }
  }
  logout(){
    userSignedIn.currentUser = 'NULL';
    userSignedIn.bussinessName = "My Business";
    console.log("logout Ran");
    this.router.navigate(['Home'])
    this.checkLog.emit(true);
  }
  
}
