import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedinUser = localStorage.getItem("username");

  constructor(private authService: AuthService) {
  }

  logout(){
    this.authService.logout();
  }

}
