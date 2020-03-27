import { Component, Input } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { isNgTemplate } from '@angular/compiler';
import { AppCart } from '../models/app-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') cart: AppCart;

  constructor(private cartService: ShoppingCartService) {
   }

   getQuantity(){
     return this.cart.getQuantity(this.product);
   }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}
