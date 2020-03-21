import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Observable, of } from 'rxjs';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { AppUser } from '../../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.userService.get(user.uid);
      }), 
      map((appUser: AppUser) => appUser.isAdmin ));
    }
    
}
