import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router:Router) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // return user in boolean with two NOT opertor
      tap(loggedIn => {
        if(!loggedIn) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
      })
    );
  }
}
