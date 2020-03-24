import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../models/app-product';
import { Subscription } from 'rxjs';
import { switchMap  } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) { 
    this.subscription = this.productService
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

  ngOnInit(){
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
