import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { map } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AppProduct } from 'src/app/models/app-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[];
  filteredProducts: AppProduct[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(p => {
      this.filteredProducts = this.products = p; 
      this.dtTrigger.next();
    });
   }

  ngOnInit(): void {
    // config datatables
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searching:false,
      lengthChange: false
      // serverside processing see:
      // http://l-lin.github.io/angular-datatables/#/basic/server-side-angular-way
    };
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query:string){
    this.filteredProducts = (query) ?  
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products
  }

}
