import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isMenuCollapsed = true;
  loggedInUser: AppUser;

  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => this.loggedInUser = appUser);
  }

  logout(){
    this.auth.logout();
    this.router.navigate([''])
  }

}
