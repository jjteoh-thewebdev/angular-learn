import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { AppCart } from '../models/app-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  isMenuCollapsed = true;
  loggedInUser: AppUser;
  cartItemCount: number;
  cart$: Observable<AppCart>;
  cart: AppCart;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private cartService: ShoppingCartService) {
   
  }

  logout(){
    this.auth.logout();
    this.router.navigate([''])
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.loggedInUser = appUser);
    this.cart$ = (await this.cartService.getCart()).pipe(map((x:any) => { return new AppCart(x.items); }));
    
  }

  ngOnDestroy(){}

}
