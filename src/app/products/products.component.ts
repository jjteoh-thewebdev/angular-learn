import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../models/app-product';
import { Subscription } from 'rxjs';
import { switchMap  } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;
  productSubscription: Subscription;
  cartSubscription: Subscription;
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
    ) { 
    this.productSubscription = this.productService
    .getAll()
    .pipe(
      // use switchMap to solve timing issue,
      // this way products will be loaded from firebase first
      // then we return queryparams to filter
      switchMap(products => {
        this.products = products;
      return route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? 
        this.products.filter(p => p.category.toLowerCase() === this.category.toLowerCase()) : 
        this.products;
    });
  }

  async ngOnInit(){
    this.cartSubscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.productSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }


}
