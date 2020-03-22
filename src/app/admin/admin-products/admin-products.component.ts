import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().pipe(
      map(products => {
        let data = [];
        products.forEach(product => {
          data.push(Object.assign({}, {key: product.key}, product.payload.val()));
        });
        
        return data;
      }));
   }

  ngOnInit(): void {
  }

}
