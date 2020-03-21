import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;

  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = this.categoryService
                        .getCategories();
  }

  ngOnInit(): void {
  }

  save(product){
    this.productService.create(product);
    // TODO: toast success and fail msg, clear form
  }

}
