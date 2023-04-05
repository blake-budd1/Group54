import { Component } from '@angular/core';
import { userSignedIn } from './lfile';
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LocalBusinessFinder';
  loggedIn: boolean = false;
  checkLogged(){
    console.log("checkLogged Ran");
    if(userSignedIn.currentUser != "NULL"){
      this.loggedIn = true;
    }else{
      this.loggedIn = false
    }
  }
  onCheckLog(input: boolean){
    this.checkLogged();
  }
}
