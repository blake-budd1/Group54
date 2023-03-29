import { Component, Input } from '@angular/core';
import { userSignedIn } from '../lfile';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()  loggedIn: boolean = false;
  
  swapLogged(){
    if(this.loggedIn) {
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }
  }
}
