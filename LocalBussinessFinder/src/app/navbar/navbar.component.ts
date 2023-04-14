import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userSignedIn } from '../lfile';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()  loggedIn: boolean = false;
  @Output() checkLog = new EventEmitter<boolean>();
  swapLogged(){
    if(this.loggedIn) {
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }
  }
  logout(){
    userSignedIn.currentUser = 'NULL';
    console.log("logout Ran");
    this.checkLog.emit(true);
  }
  fakeLog(){
    userSignedIn.currentUser = "NormalUsername";
    console.log("FakeLog Ran");
    this.checkLog.emit(true);
  }
}
