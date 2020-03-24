import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router){
    auth.user$.subscribe(user => {
     if(!user) return;

     // we save everytimes login because its login using google
        // user may change his/her displayname on google
     userService.save(user);
     let returnUrl = localStorage.getItem('returnUrl'); 
     
     if(!returnUrl) return;
    
     returnUrl = returnUrl == "null"?  '' : returnUrl;
     localStorage.removeItem('returnUrl');
     router.navigateByUrl(returnUrl);

      // if(user){
      //   // we save everytimes login because its login using google
      //   // user may change his/her displayname on google
      //   userService.save(user);

      //   let returnUrl = localStorage.getItem('returnUrl');
      //   if(!returnUrl || returnUrl == "null")
      //     returnUrl = 'home';

      //   router.navigateByUrl(returnUrl);
      // }
    });
  }
}
