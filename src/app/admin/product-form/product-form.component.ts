import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppProduct } from 'src/app/models/app-product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product:AppProduct = {title: "", price: 0, category: "", imageUrl: ""};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = this.categoryService.getAll();
  
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.productService.get(this.id).pipe(take(1)).subscribe((p:AppProduct) => this.product = p);
    }
  }

  ngOnInit(): void {
    
  }

  save(product){

    if(this.id)
      this.productService.update(this.id, product);
    else
      this.productService.create(product);

    // TODO: toast success and fail msg, clear form
    this.router.navigate(['/admin/products/']);
  }

  delete(){
    if(confirm('Confirm delete?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products/']);
    }
  }

}
