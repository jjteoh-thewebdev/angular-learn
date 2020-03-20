import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { take, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // convention app need to map observable fb user to user model
  user$: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
   }

  async login(){
    // store return url to localstorage
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem("returnUrl", returnUrl);

    // redirect to google login
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithRedirect(provider)
  }

  async logout(){
    await this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if(user)
          return this.userService.get(user.uid);
        
        return of(null);
      })
    );
  }
}
