import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppCart } from '../models/app-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<AppCart>;
  cart: AppCart;
  
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart()).pipe(map((x:any) => { return new AppCart(x.items); }));
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
